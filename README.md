# ⚡ Nocver — Environment Variable Converter

Nocver is a premium, beautifully designed web tool to instantly convert environment configuration files across various formats. Designed with strict privacy in mind, all operations run **100% locally in your browser**—your sensitive environment variables are never sent to any server.

## ✨ Features

- **Multi-Format Support:** Instantly convert between `.env`, `JSON`, `TOML`, and `Azure App Settings`.
- **Zero-Data Privacy:** Everything happens offline in your browser. Perfect for highly sensitive API keys and secrets.
- **Modern Glassmorphism UI:** Features a stunning dark-mode interface with subtle gradients and animations.
- **Developer Friendly:** Copy to clipboard, instant file downloads, and quick swap buttons.
- **Fully Responsive:** Optimized for both desktop and mobile viewing.

## 🛠️ Technology Stack

- **Framework:** React + TypeScript (powered by Vite)
- **Styling:** Custom CSS with a focus on modern glassmorphism
- **Icons:** Lucide React
- **Hosting:** Configured for seamless automated deployments to **Cloudflare Pages** via GitHub.

## 🚀 Getting Started

To run Nocver locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hirumzz/nocto-envconverter.git
   cd nocto-envconverter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   *(This will compile the optimized production bundle to the `/dist` directory).*

## ☁️ Deployment

This project is built to be deployed on **Cloudflare Pages**. 
Just connect this GitHub repository to your Cloudflare account, set the build command to `npm run build`, and set the output directory to `dist`. Any future commits to the `main` branch will automatically trigger a deployment!

---
*Created by [hirumzz](https://github.com/hirumzz) — Built for speed, privacy, and aesthetics.*
