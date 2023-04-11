# Github Commit Calendar
![Image](https://i.ibb.co/842K6W9/Screenshot-2023-04-08-at-12-52-40-PM-2.png)


[![npm version](https://badge.fury.io/js/github-commit-calendar.svg)](https://badge.fury.io/js/github-commit-calendar) 🔥 
[![npm](https://img.shields.io/npm/dw/github-commit-calendar)](https://npmjs.com/package/github-commit-calendar) ⭐️ 
[![Downloads](https://img.shields.io/npm/dt/github-commit-calendar.svg)](https://www.npmjs.com/package/github-commit-calendar) 🚀 
[![GitHub Stars](https://img.shields.io/github/stars/Ddupasquier/githubCommits?style=social)](https://github.com/Ddupasquier/githubCommits/stargazers) 😎 
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/) 💖 
[![Platform support](https://img.shields.io/badge/Platform%20support-%20Svelte-green.svg)](https://github.com/Ddupasquier/githubCommits) 🛠️


A Svelte component that displays a user's GitHub commit history as a calendar. You can customize the appearance of the calendar using the available props.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [About](#about)

## Installation

```bash
npm install github-commit-calendar
```

## Usage

Import the component and use it in your Svelte application:

```js
<script>
  import { GithubCommitCalendar } from "github-commit-calendar";
</script>

<GithubCommitCalendar gitToken={your_github_token} />
```



### Obtaining a GitHub Token

To use this component, you need a GitHub token with minimal permissions. Follow these steps to generate a token:
<ol>

<li>Go to your <a href="https://github.com/settings/tokens">Github Settings</a></li>

<li>Click on "Generate new token"</li>

<li>Give the token a description and only select the "public_repo" scope.</li>

<li>Click "Generate token"</li>

<li>Copy the generated token and pass it as the gitToken prop to the component.</li>
</ol>

<b>Note: Keep your token secure and do not share it publicly. 🚨</b>



### Props

| Prop         | Type                  | Default                   | Description                                              |
| ------------ | --------------------- | ------------------------- | -------------------------------------------------------- |
| gitToken     | string                | -                         | **Required**. Your GitHub token with "public_repo" scope.|
| color        | string                | 'rgba(187, 53, 220)'      | The color of the commit bars.                            |
| size         | 'small', 'medium', 'large', number | 'medium'     | The size of the commit bars. The value can either be a string of the specific size, or it can be a number in px.                                                                                   |
| background   | string                | 'rgba(187, 53, 220, .1)'  | The background color of the calendar.                    |
| gap          | number                | 2                         | The gap between each cell in px.                         |
| hover        | boolean               | false                     | The hover animation of the calendar.                     |
| key          | boolean               | true                      | Key to be shown or not shown.                            | 
| months       | boolean               | true                      | Months to be shown or not shown.                         |
| weekdays     | boolean               | true                      | Weekdays to be shown or not shown.                       |



### Rest Props

Any additional props will be passed down to the top-level div element of the component. This can be useful for adding custom styles or attributes.

```js
<GithubCommitCalendar gitToken={your_github_token} id="custom-id" style="custom styles" />
```



## About

### The Project

This project aims to provide a simple, customizable Svelte component for visualizing GitHub commit history. It was designed to be lightweight and easy to integrate into any Svelte application.