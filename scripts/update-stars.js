#!/usr/bin/env node

/**
 * Update Star Counts Script
 * Fetches star counts from GitHub API and updates existing numeric labels in
 * both READMEs. Star columns additionally populate missing GitHub entries, so
 * category formats stay stable and the search index can expose star filters.
 */

const fs = require('fs');
const https = require('https');

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

// Update star count in README content
function updateStarsInContent(content, repo, formattedStars) {
  const repoUrl = `https://github.com/${repo}`;
  return content.split('\n').map((line) => {
    if (!line.includes(repoUrl)) return line;

    const enStarMatch = line.match(/^(\s*-\s*\[[^\]]+\]\([^)\s]+\)\s*-\s*)(.*)$/);
    if (enStarMatch && /^(?:[\d.,]+k?\s*⭐\s*-\s*)+/.test(enStarMatch[2])) {
      return `${enStarMatch[1]}${formattedStars} ⭐ - ${enStarMatch[2].replace(
        /^(?:[\d.,]+k?\s*⭐\s*-\s*)+/,
        ''
      )}`;
    }

    return line
      .replace(/([（(])\s*[\d.]+k?\s*⭐\s*([）)])/gi, `$1${formattedStars} ⭐$2`)
      .replace(/(\|\s*)[\d.]+k?(\s*\|\s*\[[^\]]+\]\(https:\/\/github\.com\/[^)]+\))/i, `$1${formattedStars}$2`);
  }).join('\n');
}

function updateMissingStarsInContent(content, repo, formattedStars) {
  const repoUrl = `https://github.com/${repo}`;
  return content.split('\n').map((line) => {
    if (!line.includes(repoUrl)) return line;

    const enMatch = line.match(/^(\s*-\s*\[[^\]]+\]\([^)\s]+\)\s*-\s*)(.*)$/);
    if (enMatch && /^[\d.,]+k?\s*⭐\s*-\s*/.test(enMatch[2])) return line;

    if (enMatch) return `${enMatch[1]}${formattedStars} ⭐ - ${enMatch[2]}`;

    const zhMatch = line.match(/^(\|[^|]*\|[^|]*\|)\s*-\s*(\|\s*\[[^\]]+\]\([^)\s]+\)\s*\|\s*)$/);
    if (zhMatch) return `${zhMatch[1]}${formattedStars}${zhMatch[2]}`;

    return line;
  }).join('\n');
}

function collectRepos(...contents) {
  const repos = new Set();
  const pattern = /https:\/\/github\.com\/([^/\s)]+\/[^/\s)#]+)/g;

  for (const content of contents) {
    for (const match of content.matchAll(pattern)) {
      const repo = match[1].replace(/\.git$/, '');
      if (repo && repo !== 'example/my-skill') {
        repos.add(repo);
      }
    }
  }

  return [...repos].sort();
}

async function main() {
  console.log('Fetching star counts...\n');

  const readmeEn = fs.readFileSync(`${ROOT}/README.md`, 'utf8');
  const readmeZh = fs.readFileSync(`${ROOT}/README_ZH.md`, 'utf8');
  const repos = collectRepos(readmeEn, readmeZh);

  // Fetch every GitHub repository referenced by the two READMEs.
  const results = [];
  for (const repo of repos) {
    try {
      const info = await fetchRepoInfo(repo);
      console.log(`${repo}: ${info.formatted} stars`);
      results.push(info);
    } catch (error) {
      console.error(`Error fetching ${repo}: ${error.message}`);
      results.push({ repo, stars: 0, formatted: '-' });
    }
  }

  let updatedEn = readmeEn;
  let updatedZh = readmeZh;

  // Update existing star labels in both files, then fill missing star columns.
  for (const { repo, formatted } of results) {
    if (formatted !== '-') {
      updatedEn = updateStarsInContent(updatedEn, repo, formatted);
      updatedZh = updateStarsInContent(updatedZh, repo, formatted);
      updatedEn = updateMissingStarsInContent(updatedEn, repo, formatted);
      updatedZh = updateMissingStarsInContent(updatedZh, repo, formatted);
    }
  }

  // Write updated files
  fs.writeFileSync(`${ROOT}/README.md`, updatedEn);
  fs.writeFileSync(`${ROOT}/README_ZH.md`, updatedZh);

  console.log('\nREADME files updated successfully!');
}

main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
