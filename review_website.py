#!/usr/bin/env python3
import os
import sys
import json
import subprocess
import shutil
from pathlib import Path

# Constants
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "p006_config.json")

def load_config():
    if not os.path.exists(CONFIG_PATH):
        print(f"Error: Config file not found at {CONFIG_PATH}")
        sys.exit(1)
    with open(CONFIG_PATH, 'r') as f:
        return json.load(f)

def run_command(command, cwd=None):
    try:
        result = subprocess.run(
            command,
            cwd=cwd,
            check=True,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(f"Stderr: {e.stderr}")
        raise e

def clone_or_pull_repo(repo_url, target_dir):
    if not repo_url:
        print("Error: GitHub URL is missing in p006_config.json")
        sys.exit(1)

    target_path = Path(target_dir)
    
    if target_path.exists() and (target_path / ".git").exists():
        print(f"Repository exists at {target_dir}. Pulling latest changes...")
        run_command("git pull", cwd=target_dir)
    else:
        print(f"Cloning repository from {repo_url} to {target_dir}...")
        # Ensure parent dir exists
        target_path.parent.mkdir(parents=True, exist_ok=True)
        # Clear directory if it exists but isn't a git repo (clean slate)
        if target_path.exists():
            shutil.rmtree(target_path)
            
        run_command(f"git clone {repo_url} {target_dir}")

def generate_file_manifest(target_dir):
    manifest = []
    target_path = Path(target_dir)
    
    for file_path in target_path.rglob("*"):
        if file_path.is_file() and not any(part.startswith(".") for part in file_path.parts):
            # Skip .git and hidden files
            try:
                stats = file_path.stat()
                manifest.append({
                    "path": str(file_path.relative_to(target_path)),
                    "size": stats.st_size,
                    "extension": file_path.suffix
                })
            except Exception as e:
                print(f"Warning: Could not stat file {file_path}: {e}")
                
    return manifest

def main():
    print("Starting Website Review Process...")
    config = load_config()
    
    repo_url = config.get("github_url")
    local_path = config.get("local_repo_path", ".tmp/p006_website_code")
    
    # Resolve local_path relative to workspace root if needed
    # Assuming execution from workspace root usually, but let's be safe
    # If it's a relative path, make it relative to the current working directory (usually workspace root)
    
    try:
        clone_or_pull_repo(repo_url, local_path)
        
        manifest = generate_file_manifest(local_path)
        manifest_path = os.path.join(local_path, "file_manifest.json")
        
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)
            
        print(f"Review preparation complete.")
        print(f"Code location: {local_path}")
        print(f"Manifest generated: {manifest_path}")
        print(f"Total files: {len(manifest)}")
        
    except Exception as e:
        print(f"Review process failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
