#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const { formats, parseCatalog, buildIndex, sourceRepository, splitTableLine } = require('./catalog');

const ROOT = require('path').resolve(__dirname, '..');

// Format star count (e.g., 1234 -> 1.2k)
function formatStars(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
}

// Fetch repo info from GitHub API, following repository redirects.
function fetchRepoInfo(repoOrPath, originalRepo = repoOrPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: /^\/repositories\//.test(repoOrPath) ? repoOrPath : `/repos/${repoOrPath}`,
      method: 'GET',
      headers: {
        'User-Agent': 'awesome-agent-skills-bot',
        'Accept': 'application/vnd.github.v3+json',
      },
    };

    // Add auth token if available
    if (process.env.GITHUB_TOKEN) {
      options.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            resolve({
              repo: originalRepo,
              stars: json.stargazers_count,
              formatted: formatStars(json.stargazers_count),
            });
          } catch (e) {
            reject(new Error(`Failed to parse response for ${repoOrPath}`));
          }
        } else if (res.statusCode === 404) {
          console.warn(`Repository not found: ${repoOrPath}`);
          resolve({ repo: repoOrPath, stars: 0, formatted: '-' });
        } else if (res.statusCode === 301 || res.statusCode === 302) {
          if (redirectCount >= 5) {
            reject(new Error(`Too many redirects for ${repoOrPath}`));
            return;
          }

          try {
            const redirectUrl = new URL(res.headers.location, `https://api.github.com/repos/${repoOrPath}`);
            if (redirectUrl.protocol !== 'https:' || redirectUrl.hostname !== 'api.github.com') {
              reject(new Error(`Unexpected redirect for ${repoOrPath}`));
              return;
            }

            resolve(fetchRepoInfo(redirectUrl.pathname, originalRepo, redirectCount + 1));
          } catch {
              reject(new Error(`Invalid redirect for ${repoOrPath}`));
          }
        } else {
        reject(new Error(`HTTP ${res.statusCode} for ${repoOrPath}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function updateStarColumn(markdown, entries, counts, language) {
  const lines = markdown.split('\n');
  const column = formats[language].columns.indexOf('Stars') + 1;
  for (const entry of entries) {
    const count = counts.get(sourceRepository(entry.url));
    if (!count || count === entry.stars) continue;
    const cells = splitTableLine(lines[entry.lineIndex]);
    cells[column] = cells[column].replace(entry.stars, count);
    lines[entry.lineIndex] = cells.join('|');
  }
  return lines.join('\n');
}

async function main() {
  const english = fs.readFileSync(`${ROOT}/README.md`, 'utf8');
  const chinese = fs.readFileSync(`${ROOT}/README_ZH.md`, 'utf8');
  const enRows = parseCatalog(english, 'en');
  const zhRows = parseCatalog(chinese, 'zh');
  const index = buildIndex(enRows, zhRows);
  const repositories = new Set(index.map(entry => sourceRepository(entry.url)));
  const counts = new Map();
  for (const repository of repositories) {
    try {
      const { formatted } = await fetchRepoInfo(repository);
      if (formatted !== '-') counts.set(repository, formatted);
    } catch (error) {
      console.error(`Keeping existing stars for ${repository}: ${error.message}`);
    }
  }
  fs.writeFileSync(`${ROOT}/README.md`, updateStarColumn(english, enRows, counts, 'en'));
  fs.writeFileSync(`${ROOT}/README_ZH.md`, updateStarColumn(chinese, zhRows, counts, 'zh'));
  console.log(`Updated star columns from ${counts.size} GitHub repositories.`);
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { updateStarColumn };
