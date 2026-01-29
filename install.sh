#!/usr/bin/env bash

# Awesome Agent Skills - One-Click Installer
# https://github.com/JackyST0/awesome-agent-skills
# Compatible with: macOS, Linux, Windows (WSL/Git Bash)

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Repository URL
REPO_URL="https://github.com/JackyST0/awesome-agent-skills"
REPO_RAW="https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main"

# Available skills
SKILLS="code-review git-commit unit-test-generator api-doc-generator debug-helper"

# Skill templates mapping
get_skill_templates() {
    case $1 in
        unit-test-generator) echo "test-report.md" ;;
        api-doc-generator)   echo "api-doc.md" ;;
        debug-helper)        echo "debug-report.md" ;;
        *)                   echo "" ;;
    esac
}

# Platform names
PLATFORMS="cursor claude copilot windsurf codex"

# Get platform directory
get_platform_dir() {
    case $1 in
        cursor)   echo "$HOME/.cursor/skills" ;;
        claude)   echo "$HOME/.claude/skills" ;;
        copilot)  echo "$HOME/.copilot/skills" ;;
        windsurf) echo "$HOME/.windsurf/skills" ;;
        codex)    echo "$HOME/.codex/skills" ;;
        *)        echo "" ;;
    esac
}

# Print banner
print_banner() {
    printf "${CYAN}"
    echo "╔═══════════════════════════════════════════════════════════╗"
    echo "║           Awesome Agent Skills Installer                  ║"
    echo "║     https://github.com/JackyST0/awesome-agent-skills      ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    printf "${NC}\n"
}

# Print help
print_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -p, --platform PLATFORM   Target platform (cursor, claude, copilot, windsurf, codex)"
    echo "  -s, --skill SKILL         Skill to install/uninstall (can be used multiple times)"
    echo "  -a, --all                 Install/uninstall all skills"
    echo "  -u, --uninstall           Uninstall skills instead of installing"
    echo "  -l, --list                List available skills"
    echo "  --list-installed          List installed skills for a platform"
    echo "  -h, --help                Show this help message"
    echo ""
    echo "Install Examples:"
    echo "  $0 -p cursor -s code-review"
    echo "  $0 -p claude -a"
    echo ""
    echo "Uninstall Examples:"
    echo "  $0 -p cursor -u -s code-review    # Uninstall specific skill"
    echo "  $0 -p cursor -u -a                # Uninstall all skills"
    echo "  $0 -p cursor --list-installed     # List installed skills"
    echo ""
    echo "Interactive mode (no arguments):"
    echo "  $0"
}

# List available skills
list_skills() {
    printf "${BLUE}Available Skills:${NC}\n\n"
    for skill in $SKILLS; do
        printf "  ${GREEN}•${NC} %s\n" "$skill"
    done
    echo ""
}

# List available platforms
list_platforms() {
    printf "${BLUE}Available Platforms:${NC}\n\n"
    for platform in $PLATFORMS; do
        dir=$(get_platform_dir "$platform")
        printf "  ${GREEN}•${NC} %s -> %s\n" "$platform" "$dir"
    done
    echo ""
}

# List installed skills for a platform
list_installed() {
    platform=$1
    target_dir=$(get_platform_dir "$platform")

    if [ ! -d "$target_dir" ]; then
        printf "${YELLOW}No skills directory found for %s${NC}\n" "$platform"
        printf "Expected path: %s\n" "$target_dir"
        return
    fi

    printf "${BLUE}Installed skills for %s:${NC}\n\n" "$platform"

    found=false
    for skill in $SKILLS; do
        skill_dir="$target_dir/$skill"
        if [ -d "$skill_dir" ] && [ -f "$skill_dir/SKILL.md" ]; then
            printf "  ${GREEN}•${NC} %s\n" "$skill"
            found=true
        fi
    done

    # Also list other skills not in our list
    if [ -d "$target_dir" ]; then
        for dir in "$target_dir"/*/; do
            if [ -d "$dir" ]; then
                skill_name=$(basename "$dir")
                # Check if it's not in our standard list
                is_standard=false
                for skill in $SKILLS; do
                    if [ "$skill" = "$skill_name" ]; then
                        is_standard=true
                        break
                    fi
                done
                if [ "$is_standard" = false ] && [ -f "$dir/SKILL.md" ]; then
                    printf "  ${CYAN}•${NC} %s (custom)\n" "$skill_name"
                    found=true
                fi
            fi
        done
    fi

    if [ "$found" = false ]; then
        printf "  ${YELLOW}No skills installed${NC}\n"
    fi
    echo ""
}

# Uninstall a skill
uninstall_skill() {
    skill=$1
    target_dir=$2
    skill_dir="$target_dir/$skill"

    printf "${YELLOW}Uninstalling %s...${NC}\n" "$skill"

    if [ -d "$skill_dir" ]; then
        rm -rf "$skill_dir"
        printf "  ${GREEN}✓${NC} Removed %s\n" "$skill_dir"
    else
        printf "  ${YELLOW}⚠${NC} Skill not found: %s\n" "$skill_dir"
    fi
}

# Download and install a skill
install_skill() {
    skill=$1
    target_dir=$2
    skill_dir="$target_dir/$skill"

    printf "${YELLOW}Installing %s...${NC}\n" "$skill"

    # Create directory
    mkdir -p "$skill_dir"
    mkdir -p "$skill_dir/templates" 2>/dev/null || true

    # Download SKILL.md
    if curl -sL "$REPO_RAW/examples/$skill/SKILL.md" -o "$skill_dir/SKILL.md"; then
        printf "  ${GREEN}✓${NC} Downloaded SKILL.md\n"
    else
        printf "  ${RED}✗${NC} Failed to download SKILL.md\n"
        return 1
    fi

    # Download templates for this skill
    templates=$(get_skill_templates "$skill")
    if [ -n "$templates" ]; then
        for template in $templates; do
            if curl -sL --fail "$REPO_RAW/examples/$skill/templates/$template" -o "$skill_dir/templates/$template" 2>/dev/null; then
                printf "  ${GREEN}✓${NC} Downloaded templates/%s\n" "$template"
            fi
        done
    fi

    printf "${GREEN}✓ Installed %s to %s${NC}\n" "$skill" "$skill_dir"
}

# Interactive mode
interactive_mode() {
    print_banner

    # Check if running in interactive terminal
    if [ ! -t 0 ]; then
        printf "${YELLOW}Non-interactive mode detected. Use command line arguments:${NC}\n\n"
        print_help
        exit 1
    fi

    # Select action
    printf "${BLUE}What would you like to do?${NC}\n\n"
    echo "  1) Install skills"
    echo "  2) Uninstall skills"
    echo "  3) List installed skills"
    echo ""
    printf "Enter number (1-3): "
    read -r action_choice

    case $action_choice in
        1) action="install" ;;
        2) action="uninstall" ;;
        3) action="list" ;;
        *)
            printf "${RED}Invalid selection${NC}\n"
            exit 1
            ;;
    esac

    echo ""

    # Select platform
    printf "${BLUE}Select target platform:${NC}\n\n"
    i=1
    for platform in $PLATFORMS; do
        dir=$(get_platform_dir "$platform")
        echo "  $i) $platform ($dir)"
        i=$((i + 1))
    done
    echo ""
    printf "Enter number (1-5): "
    read -r platform_choice

    # Validate choice
    case $platform_choice in
        1) selected_platform="cursor" ;;
        2) selected_platform="claude" ;;
        3) selected_platform="copilot" ;;
        4) selected_platform="windsurf" ;;
        5) selected_platform="codex" ;;
        *)
            printf "${RED}Invalid selection${NC}\n"
            exit 1
            ;;
    esac

    target_dir=$(get_platform_dir "$selected_platform")

    # Handle list action
    if [ "$action" = "list" ]; then
        echo ""
        list_installed "$selected_platform"
        exit 0
    fi

    # For install/uninstall, select skills
    echo ""
    if [ "$action" = "install" ]; then
        printf "${BLUE}Select skills to install:${NC}\n\n"
    else
        printf "${BLUE}Select skills to uninstall:${NC}\n\n"
    fi
    echo "  0) All skills"
    i=1
    for skill in $SKILLS; do
        echo "  $i) $skill"
        i=$((i + 1))
    done
    echo ""
    printf "Enter numbers separated by space (e.g., 1 3 5) or 0 for all: "
    read -r skill_choices

    selected_skills=""
    if [ "$skill_choices" = "0" ]; then
        selected_skills="$SKILLS"
    else
        for choice in $skill_choices; do
            case $choice in
                1) selected_skills="$selected_skills code-review" ;;
                2) selected_skills="$selected_skills git-commit" ;;
                3) selected_skills="$selected_skills unit-test-generator" ;;
                4) selected_skills="$selected_skills api-doc-generator" ;;
                5) selected_skills="$selected_skills debug-helper" ;;
            esac
        done
    fi

    if [ -z "$selected_skills" ]; then
        printf "${RED}No skills selected${NC}\n"
        exit 1
    fi

    echo ""

    # Execute action
    if [ "$action" = "install" ]; then
        printf "${BLUE}Installing to %s...${NC}\n\n" "$target_dir"
        for skill in $selected_skills; do
            install_skill "$skill" "$target_dir"
        done
        echo ""
        printf "${GREEN}Installation complete!${NC}\n"
        printf "Skills installed to: ${CYAN}%s${NC}\n" "$target_dir"
    else
        printf "${BLUE}Uninstalling from %s...${NC}\n\n" "$target_dir"
        for skill in $selected_skills; do
            uninstall_skill "$skill" "$target_dir"
        done
        echo ""
        printf "${GREEN}Uninstall complete!${NC}\n"
    fi
}

# Check if skill is valid
is_valid_skill() {
    check_skill=$1
    for skill in $SKILLS; do
        if [ "$skill" = "$check_skill" ]; then
            return 0
        fi
    done
    return 1
}

# Check if platform is valid
is_valid_platform() {
    check_platform=$1
    for platform in $PLATFORMS; do
        if [ "$platform" = "$check_platform" ]; then
            return 0
        fi
    done
    return 1
}

# Main
main() {
    platform=""
    skills=""
    install_all=false
    uninstall_mode=false
    list_installed_mode=false

    # Parse arguments
    while [ $# -gt 0 ]; do
        case $1 in
            -p|--platform)
                platform="$2"
                shift 2
                ;;
            -s|--skill)
                skills="$skills $2"
                shift 2
                ;;
            -a|--all)
                install_all=true
                shift
                ;;
            -u|--uninstall)
                uninstall_mode=true
                shift
                ;;
            --list-installed)
                list_installed_mode=true
                shift
                ;;
            -l|--list)
                list_skills
                list_platforms
                exit 0
                ;;
            -h|--help)
                print_help
                exit 0
                ;;
            *)
                printf "${RED}Unknown option: %s${NC}\n" "$1"
                print_help
                exit 1
                ;;
        esac
    done

    # If no arguments, run interactive mode
    if [ -z "$platform" ] && [ -z "$skills" ] && [ "$install_all" = false ] && [ "$list_installed_mode" = false ]; then
        interactive_mode
        exit 0
    fi

    # Validate platform
    if [ -z "$platform" ]; then
        printf "${RED}Error: Platform is required${NC}\n"
        print_help
        exit 1
    fi

    if ! is_valid_platform "$platform"; then
        printf "${RED}Error: Unknown platform '%s'${NC}\n" "$platform"
        list_platforms
        exit 1
    fi

    target_dir=$(get_platform_dir "$platform")

    # Handle list-installed mode
    if [ "$list_installed_mode" = true ]; then
        print_banner
        list_installed "$platform"
        exit 0
    fi

    # Determine skills to install/uninstall
    if [ "$install_all" = true ]; then
        skills="$SKILLS"
    fi

    if [ -z "$skills" ]; then
        printf "${RED}Error: No skills specified${NC}\n"
        print_help
        exit 1
    fi

    # Validate skills
    for skill in $skills; do
        if ! is_valid_skill "$skill"; then
            printf "${RED}Error: Unknown skill '%s'${NC}\n" "$skill"
            list_skills
            exit 1
        fi
    done

    print_banner

    # Uninstall or Install
    if [ "$uninstall_mode" = true ]; then
        printf "${BLUE}Uninstalling from %s...${NC}\n\n" "$target_dir"
        for skill in $skills; do
            uninstall_skill "$skill" "$target_dir"
        done
        echo ""
        printf "${GREEN}Uninstall complete!${NC}\n"
    else
        printf "${BLUE}Installing to %s...${NC}\n\n" "$target_dir"
        for skill in $skills; do
            install_skill "$skill" "$target_dir"
        done
        echo ""
        printf "${GREEN}Installation complete!${NC}\n"
    fi
}

main "$@"
