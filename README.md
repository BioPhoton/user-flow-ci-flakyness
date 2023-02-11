# Experiments on lighthouse user-flow variance

The purpose of this repository is to better understand the variance that occurs when running userflow. 

> TODO - Expand on motivation
>   - Motivation includes improve decision-making based on results
> TODO - Expand on existing resources

## Variance on GitHub Runners

### Overview

The purpose of this experiment is to document the impact of 
[Client hardware variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md#client-hardware-variability) 
and [Client resource contention](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md#client-resource-contention) 
when running user-flow on a GitHub Actions Runner. For this reason we attempted to mitigate the impact of the main 
[sources of variance](https://github.com/GoogleChrome/lighthouse/issues/10657#issue-608608580) identified by lighthouse.

**Mitigation Strategies**

- [Page Nondeterminism](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md#page-nondeterminism): Ensuring that the exact same version of the page is being tested between different runs.
- [Local Network Variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md#local-network-variability): Serve application locally with no external resources.
- [Tier-1 Network Variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md#tier-1-network-variability): Serve application locally with no external resources.
- [Web Server Variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md#web-server-variability): Serve application locally with no external resources.
- [Browser Nondeterminism](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md#browser-nondeterminism): Serve simple application with no complex logic.

**Target Details**

_Application_

The Target application is [Coffee cart](https://github.com/jecfish/coffee-cart) which is served locally using vite preview.

_User Flow Run_

The user was generated using `npx @push-based/user-flow init` and executed as a cron job in a GitHub CI workflow using `npx @push-based/user-flow init` over a GitHub runner.

**Data Collected**

The was collected between `TODO` and `TODO` during this time user-flow collect was executed 200 times inside a GitHub runner.
The user-flow only collected data from the performance category for an initial navigation. 
After each run the fetch time and performance score we appended to the previews results and the rest of the json was deleted.

### Results

The results varied, with the highest score of 0.98, the lowest score of 0.87, a mean of 0.948 and a medium of 0.96.

> TODO - Update Image when cron is finished

![untitled-2](https://user-images.githubusercontent.com/40126819/218272756-25615288-0648-4152-ba15-30d9c077580b.png)

