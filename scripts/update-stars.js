#!/usr/bin/env node

/**
 * Update Star Counts Script
 * Fetches star counts from GitHub API and updates README files
 */

const fs = require('fs');
const https = require('https');

// GitHub repos to track (owner/repo format)
const REPOS = [
  'anthropics/skills',
  'PatrickJS/awesome-cursorrules',
  'affaan-m/everything-claude-code',
  'ComposioHQ/awesome-claude-skills',
  'hesreallyhim/awesome-claude-code',
  'numman-ali/openskills',
  'VoltAgent/awesome-claude-skills',
  'simonw/claude-skills',
  'abubakarsiddik31/claude-skills-collection',
  'thehimel/cursor-rules-and-prompts',
  'blencorp/claude-code-kit',
];

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
  // Match patterns like "| 56.1k |" or "| 1.2k |" or "| - |" followed by GitHub link
  const repoName = repo.split('/')[1];
  const owner = repo.split('/')[0];

  // Pattern: | old_stars | [GitHub](https://github.com/owner/repo)
  const pattern = new RegExp(
    `\\|\\s*[\\d.]+k?\\s*\\|\\s*\\[GitHub\\]\\(https://github\\.com/${owner}/${repoName}\\)`,
    'g'
  );

  return content.replace(pattern, `| ${formattedStars} | [GitHub](https://github.com/${repo})`);
}

async function main() {
  console.log('Fetching star counts...\n');

  // Fetch all repo info
  const results = await Promise.all(
    REPOS.map(async (repo) => {
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

  // Read README files
  const readmeEn = fs.readFileSync('README.md', 'utf8');
  const readmeZh = fs.readFileSync('README_ZH.md', 'utf8');

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
  fs.writeFileSync('README.md', updatedEn);
  fs.writeFileSync('README_ZH.md', updatedZh);

  console.log('\nREADME files updated successfully!');
}

main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
