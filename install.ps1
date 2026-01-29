# Awesome Agent Skills - Windows Installer
# https://github.com/JackyST0/awesome-agent-skills
# PowerShell script for Windows

param(
    [string]$Platform,
    [string[]]$Skill,
    [switch]$All,
    [switch]$Uninstall,
    [switch]$ListInstalled,
    [switch]$List,
    [switch]$Help
)

$ErrorActionPreference = "Stop"

# Repository URL
$REPO_RAW = "https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main"

# Available skills
$SKILLS = @("code-review", "git-commit", "unit-test-generator", "api-doc-generator", "debug-helper")

# Skill templates mapping
$SKILL_TEMPLATES = @{
    "unit-test-generator" = @("test-report.md")
    "api-doc-generator"   = @("api-doc.md")
    "debug-helper"        = @("debug-report.md")
}

# Platform names
$PLATFORMS = @("cursor", "claude", "copilot", "windsurf", "codex")

# Get platform directory
function Get-PlatformDir {
    param([string]$PlatformName)
    switch ($PlatformName) {
        "cursor"   { return "$env:USERPROFILE\.cursor\skills" }
        "claude"   { return "$env:USERPROFILE\.claude\skills" }
        "copilot"  { return "$env:USERPROFILE\.copilot\skills" }
        "windsurf" { return "$env:USERPROFILE\.windsurf\skills" }
        "codex"    { return "$env:USERPROFILE\.codex\skills" }
        default    { return "" }
    }
}

# Print banner
function Print-Banner {
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║           Awesome Agent Skills Installer                  ║" -ForegroundColor Cyan
    Write-Host "║     https://github.com/JackyST0/awesome-agent-skills      ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

# Print help
function Print-Help {
    Write-Host "Usage: .\install.ps1 [OPTIONS]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -Platform PLATFORM    Target platform (cursor, claude, copilot, windsurf, codex)"
    Write-Host "  -Skill SKILL          Skill to install/uninstall (can be used multiple times)"
    Write-Host "  -All                  Install/uninstall all skills"
    Write-Host "  -Uninstall            Uninstall skills instead of installing"
    Write-Host "  -List                 List available skills"
    Write-Host "  -ListInstalled        List installed skills for a platform"
    Write-Host "  -Help                 Show this help message"
    Write-Host ""
    Write-Host "Install Examples:"
    Write-Host "  .\install.ps1 -Platform cursor -Skill code-review"
    Write-Host "  .\install.ps1 -Platform claude -All"
    Write-Host ""
    Write-Host "Uninstall Examples:"
    Write-Host "  .\install.ps1 -Platform cursor -Uninstall -Skill code-review"
    Write-Host "  .\install.ps1 -Platform cursor -Uninstall -All"
    Write-Host "  .\install.ps1 -Platform cursor -ListInstalled"
    Write-Host ""
    Write-Host "Interactive mode (no arguments):"
    Write-Host "  .\install.ps1"
}

# List available skills
function List-Skills {
    Write-Host "Available Skills:" -ForegroundColor Blue
    Write-Host ""
    foreach ($skill in $SKILLS) {
        Write-Host "  * $skill" -ForegroundColor Green
    }
    Write-Host ""
}

# List available platforms
function List-Platforms {
    Write-Host "Available Platforms:" -ForegroundColor Blue
    Write-Host ""
    foreach ($platform in $PLATFORMS) {
        $dir = Get-PlatformDir $platform
        Write-Host "  * $platform -> $dir" -ForegroundColor Green
    }
    Write-Host ""
}

# List installed skills for a platform
function List-InstalledSkills {
    param([string]$PlatformName)
    $targetDir = Get-PlatformDir $PlatformName

    if (-not (Test-Path $targetDir)) {
        Write-Host "No skills directory found for $PlatformName" -ForegroundColor Yellow
        Write-Host "Expected path: $targetDir"
        return
    }

    Write-Host "Installed skills for $PlatformName`:" -ForegroundColor Blue
    Write-Host ""

    $found = $false
    foreach ($skill in $SKILLS) {
        $skillDir = Join-Path $targetDir $skill
        $skillFile = Join-Path $skillDir "SKILL.md"
        if ((Test-Path $skillDir) -and (Test-Path $skillFile)) {
            Write-Host "  * $skill" -ForegroundColor Green
            $found = $true
        }
    }

    # Also list custom skills
    if (Test-Path $targetDir) {
        Get-ChildItem -Path $targetDir -Directory | ForEach-Object {
            $skillName = $_.Name
            if ($skillName -notin $SKILLS) {
                $skillFile = Join-Path $_.FullName "SKILL.md"
                if (Test-Path $skillFile) {
                    Write-Host "  * $skillName (custom)" -ForegroundColor Cyan
                    $found = $true
                }
            }
        }
    }

    if (-not $found) {
        Write-Host "  No skills installed" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Uninstall a skill
function Uninstall-Skill {
    param([string]$SkillName, [string]$TargetDir)
    $skillDir = Join-Path $TargetDir $SkillName

    Write-Host "Uninstalling $SkillName..." -ForegroundColor Yellow

    if (Test-Path $skillDir) {
        Remove-Item -Path $skillDir -Recurse -Force
        Write-Host "  [OK] Removed $skillDir" -ForegroundColor Green
    } else {
        Write-Host "  [!] Skill not found: $skillDir" -ForegroundColor Yellow
    }
}

# Download and install a skill
function Install-Skill {
    param([string]$SkillName, [string]$TargetDir)
    $skillDir = Join-Path $TargetDir $SkillName
    $templatesDir = Join-Path $skillDir "templates"

    Write-Host "Installing $SkillName..." -ForegroundColor Yellow

    # Create directories
    New-Item -ItemType Directory -Path $skillDir -Force | Out-Null
    New-Item -ItemType Directory -Path $templatesDir -Force -ErrorAction SilentlyContinue | Out-Null

    # Download SKILL.md
    try {
        $skillUrl = "$REPO_RAW/examples/$SkillName/SKILL.md"
        $skillPath = Join-Path $skillDir "SKILL.md"
        Invoke-WebRequest -Uri $skillUrl -OutFile $skillPath -UseBasicParsing
        Write-Host "  [OK] Downloaded SKILL.md" -ForegroundColor Green
    } catch {
        Write-Host "  [X] Failed to download SKILL.md" -ForegroundColor Red
        return
    }

    # Download templates for this skill
    if ($SKILL_TEMPLATES.ContainsKey($SkillName)) {
        foreach ($template in $SKILL_TEMPLATES[$SkillName]) {
            try {
                $templateUrl = "$REPO_RAW/examples/$SkillName/templates/$template"
                $templatePath = Join-Path $templatesDir $template
                Invoke-WebRequest -Uri $templateUrl -OutFile $templatePath -UseBasicParsing -ErrorAction SilentlyContinue
                Write-Host "  [OK] Downloaded templates/$template" -ForegroundColor Green
            } catch {
                # Template doesn't exist, skip silently
            }
        }
    }

    Write-Host "[OK] Installed $SkillName to $skillDir" -ForegroundColor Green
}

# Interactive mode
function Interactive-Mode {
    Print-Banner

    # Select action
    Write-Host "What would you like to do?" -ForegroundColor Blue
    Write-Host ""
    Write-Host "  1) Install skills"
    Write-Host "  2) Uninstall skills"
    Write-Host "  3) List installed skills"
    Write-Host ""
    $actionChoice = Read-Host "Enter number (1-3)"

    switch ($actionChoice) {
        "1" { $action = "install" }
        "2" { $action = "uninstall" }
        "3" { $action = "list" }
        default {
            Write-Host "Invalid selection" -ForegroundColor Red
            exit 1
        }
    }

    Write-Host ""

    # Select platform
    Write-Host "Select target platform:" -ForegroundColor Blue
    Write-Host ""
    for ($i = 0; $i -lt $PLATFORMS.Count; $i++) {
        $platform = $PLATFORMS[$i]
        $dir = Get-PlatformDir $platform
        Write-Host "  $($i + 1)) $platform ($dir)"
    }
    Write-Host ""
    $platformChoice = Read-Host "Enter number (1-5)"

    $selectedPlatform = switch ($platformChoice) {
        "1" { "cursor" }
        "2" { "claude" }
        "3" { "copilot" }
        "4" { "windsurf" }
        "5" { "codex" }
        default {
            Write-Host "Invalid selection" -ForegroundColor Red
            exit 1
        }
    }

    $targetDir = Get-PlatformDir $selectedPlatform

    # Handle list action
    if ($action -eq "list") {
        Write-Host ""
        List-InstalledSkills $selectedPlatform
        exit 0
    }

    # For install/uninstall, select skills
    Write-Host ""
    if ($action -eq "install") {
        Write-Host "Select skills to install:" -ForegroundColor Blue
    } else {
        Write-Host "Select skills to uninstall:" -ForegroundColor Blue
    }
    Write-Host ""
    Write-Host "  0) All skills"
    for ($i = 0; $i -lt $SKILLS.Count; $i++) {
        Write-Host "  $($i + 1)) $($SKILLS[$i])"
    }
    Write-Host ""
    $skillChoices = Read-Host "Enter numbers separated by space (e.g., 1 3 5) or 0 for all"

    $selectedSkills = @()
    if ($skillChoices -eq "0") {
        $selectedSkills = $SKILLS
    } else {
        $choices = $skillChoices -split '\s+'
        foreach ($choice in $choices) {
            switch ($choice) {
                "1" { $selectedSkills += "code-review" }
                "2" { $selectedSkills += "git-commit" }
                "3" { $selectedSkills += "unit-test-generator" }
                "4" { $selectedSkills += "api-doc-generator" }
                "5" { $selectedSkills += "debug-helper" }
            }
        }
    }

    if ($selectedSkills.Count -eq 0) {
        Write-Host "No skills selected" -ForegroundColor Red
        exit 1
    }

    Write-Host ""

    # Execute action
    if ($action -eq "install") {
        Write-Host "Installing to $targetDir..." -ForegroundColor Blue
        Write-Host ""
        foreach ($skill in $selectedSkills) {
            Install-Skill $skill $targetDir
        }
        Write-Host ""
        Write-Host "Installation complete!" -ForegroundColor Green
        Write-Host "Skills installed to: $targetDir" -ForegroundColor Cyan
    } else {
        Write-Host "Uninstalling from $targetDir..." -ForegroundColor Blue
        Write-Host ""
        foreach ($skill in $selectedSkills) {
            Uninstall-Skill $skill $targetDir
        }
        Write-Host ""
        Write-Host "Uninstall complete!" -ForegroundColor Green
    }
}

# Main
function Main {
    # Show help
    if ($Help) {
        Print-Help
        exit 0
    }

    # List skills and platforms
    if ($List) {
        List-Skills
        List-Platforms
        exit 0
    }

    # If no arguments, run interactive mode
    if (-not $Platform -and -not $Skill -and -not $All -and -not $ListInstalled) {
        Interactive-Mode
        exit 0
    }

    # Validate platform
    if (-not $Platform) {
        Write-Host "Error: Platform is required" -ForegroundColor Red
        Print-Help
        exit 1
    }

    if ($Platform -notin $PLATFORMS) {
        Write-Host "Error: Unknown platform '$Platform'" -ForegroundColor Red
        List-Platforms
        exit 1
    }

    $targetDir = Get-PlatformDir $Platform

    # Handle list-installed mode
    if ($ListInstalled) {
        Print-Banner
        List-InstalledSkills $Platform
        exit 0
    }

    # Determine skills to install/uninstall
    $skillsToProcess = @()
    if ($All) {
        $skillsToProcess = $SKILLS
    } elseif ($Skill) {
        $skillsToProcess = $Skill
    }

    if ($skillsToProcess.Count -eq 0) {
        Write-Host "Error: No skills specified" -ForegroundColor Red
        Print-Help
        exit 1
    }

    # Validate skills
    foreach ($s in $skillsToProcess) {
        if ($s -notin $SKILLS) {
            Write-Host "Error: Unknown skill '$s'" -ForegroundColor Red
            List-Skills
            exit 1
        }
    }

    Print-Banner

    # Uninstall or Install
    if ($Uninstall) {
        Write-Host "Uninstalling from $targetDir..." -ForegroundColor Blue
        Write-Host ""
        foreach ($s in $skillsToProcess) {
            Uninstall-Skill $s $targetDir
        }
        Write-Host ""
        Write-Host "Uninstall complete!" -ForegroundColor Green
    } else {
        Write-Host "Installing to $targetDir..." -ForegroundColor Blue
        Write-Host ""
        foreach ($s in $skillsToProcess) {
            Install-Skill $s $targetDir
        }
        Write-Host ""
        Write-Host "Installation complete!" -ForegroundColor Green
    }
}

Main
