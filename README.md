<h1 align="center">
  <a href="https://movary.org"><img src="https://github.com/leepeuker/movary/raw/main/public/images/movary-logo-192x192.png" height="160px" width="160px"></a>
  <br>
  Movary
  <br>
</h1>

<h4 align="center">The central hub to track, rate and explore your movie watch history</h4>

<p align="center">
<a href="https://hub.docker.com/r/leepeuker/movary" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/docker/pulls/leepeuker/movary" ></a>
<a href="https://github.com/leepeuker/movary" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/stars/leepeuker/movary?style=flat&color=yellow&label=github%20stars" ></a>
<a href="https://github.com/leepeuker/movary/issues" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/issues/leepeuker/movary?color=eba434&label=github%20issues" ></a>
<a href="https://discord.gg/KbcSqggrgW" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/discord/1125830398715363399" ></a>
<a href="https://github.com/leepeuker/movary/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/license/leepeuker/movary" ></a>
</p>

<p align="center">
<a href="https://movary.org" target="_blank" rel="noopener noreferrer">Website</a> •
<a href="https://docs.movary.org/install/docker/" target="_blank" rel="noopener noreferrer">Installation</a> •
<a href="https://docs.movary.org/" target="_blank" rel="noopener noreferrer">Docs</a> •
<a href="https://api.movary.org/" target="_blank" rel="noopener noreferrer">Api</a> •
<a href="https://demo.movary.org/" target="_blank" rel="noopener noreferrer">Demo</a>
</p>

Movary is a free and open source web application to track, rate and explore your movie watch history.
You can host it for yourself and others.
It offers detailed statistics,
third-party integrations for importing and exporting your history from platforms like Trakt, Letterboxd, or Netflix,
automated play tracking for Plex, Jellyfin or Emby and much [more](#features).

## About

Movary will be split up into two parts: the backend and the frontend. This repository is meant to be the frontend of Movary and has to be connected to a Movary backend in order to work.

## Development

1. To start development, first clone this repo to your device.
2. Ensure you have installed both Node.JS and Node Package Manager (NPM)
3. In the project directory, run `npm install` to install all the dependencies
4. If you're using VS Code (or Codium) install the recommended extensions. (And ensure the Firefox debugger is at least version `2.9.10`)
5. To start the Vite server, run `npm run serve` and visit `http://localhost:5173` to view the frontend.
6. Additionally, if you want to use the Firefox debugger (or some other browser), you can use the pre-defined debugging set ups and in VS Code you can press `F5` to start a debugging session.
