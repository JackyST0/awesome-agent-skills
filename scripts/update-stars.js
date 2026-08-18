#!/usr/bin/env node

/**
 * Update Star Counts Script
 * Fetches star counts from GitHub API and updates existing numeric labels
 * in both READMEs. It never adds a star label where the README has none.
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

// Fetch repo info from GitHub API
function fetchRepoInfo(repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${repo}`,
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
              repo,
              stars: json.stargazers_count,
              formatted: formatStars(json.stargazers_count),
            });
          } catch (e) {
            reject(new Error(`Failed to parse response for ${repo}`));
          }
        } else if (res.statusCode === 404) {
          console.warn(`Repository not found: ${repo}`);
          resolve({ repo, stars: 0, formatted: '-' });
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${repo}`));
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

    return line
      .replace(/([（(])\s*[\d.]+k?\s*⭐\s*([）)])/gi, `$1${formattedStars} ⭐$2`)
      .replace(/(\|\s*)[\d.]+k?(\s*\|\s*\[[^\]]+\]\(https:\/\/github\.com\/[^)]+\))/i, `$1${formattedStars}$2`);
  }).join('\n');
}

function collectRepos(...contents) {
  const repos = new Set();
  const pattern = /https:\/\/github\.com\/([^/\s)]+\/[^/\s)#]+)/g;

  for (const content of contents) {
    for (const match of content.matchAll(pattern)) {
      repos.add(match[1]);
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
  const results = await Promise.all(
    repos.map(async (repo) => {
      try {
        const info = await fetchRepoInfo(repo);
        console.log(`${repo}: ${info.formatted} stars`);
        return info;
      } catch (error) {
        console.error(`Error fetching ${repo}: ${error.message}`);
        return { repo, stars: 0, formatted: '-' };
      }
    })
  );

  let updatedEn = readmeEn;
  let updatedZh = readmeZh;

  // Update star counts in both files
  for (const { repo, formatted } of results) {
    if (formatted !== '-') {
      updatedEn = updateStarsInContent(updatedEn, repo, formatted);
      updatedZh = updateStarsInContent(updatedZh, repo, formatted);
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
