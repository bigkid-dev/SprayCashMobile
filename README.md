## SprayCash App


# 📗 Table Of Contents 
- [About](#about)
- [Problem Statement](#problem-statement)
- [Requirements](#requirements)
    - [Funtional](#functional-requirements)
    - [Non-Functional](#functional-requirements)
- [High Level Architecture](#high-level-architecture)
- [Development Workflow](#development-workflow)
- [Database Design](#database-design)
- [Code Design](#code-design)
- [Tools](#tools)


## About
SprayCash app is an event funding app where party guest can ultimately fund the host without hassle in a gamification manner digitally without the problem of currency abuse, thereby having that same physical spraying of cash pleasure. Because `Nanwo Lagbo` (spraying of cash at events) is native to nigerian culture which is now being drastically abused, we intend to preserve that culture for generations to come by digitalizing the idea and using our technical prowess to make the culture stand, and more fun and available to the world so it can be respected and appreciated, you know!. its time we spice things up!. 


## Problem Statement
In Nigerian culture, `Nanwo Lagbo` (spraying of cash at events) is a cherished tradition that celebrates hosts and enhances festive atmospheres. However, this practice is increasingly abused, leading to concerns such as currency misuse, financial inefficiencies, and logistical challenges at events. Furthermore, as the world evolves digitally, this unique cultural expression risks being diminished or misunderstood globally.

There is a need for a solution that preserves the essence of `Nanwo Lagbo` while addressing its modern challenges. Such a solution would help maintain the cultural value, elevate the experience with gamification and digitalization, and ensure accessibility for a wider audience. By reimagining this tradition, we intend promote its respect and appreciation on a global scale while making it more enjoyable and hassle-free for both hosts and guests.


## Requirements 


### Functional Requirements
- User registers with email or social login
- A user can create an event/party -> Host an event inorder for the guest to join with invite code generated or qr Code
- Guests can spray the host cash digitally and other guests the host as allowed to be sprayed giving the host the super privileged of how the cash are being disbursed with the party life cycle.
- Guests that wants to spray cash digitally and enjoy the digital experience needs join the party with the inviteCode and fund their wallet with minimum amount of #500 not fixed yet though!
- Users Using the app, gets a virtual account to fund the wallet
- Users that joined the party can get real time spending updates, and ranking of users spending, more like a leader board, Omo! odogwu is at number 1 👀
- When a user in the party spray any amount it get's broadcasted immediately to all party guests, and the spraying guest get debited, while the sprayed user gets funded, although their some technical challenges and considerations which will be discussed in the technical challenges part
- Ability for a guest to spray cash anonymously
- The host(s) and guest that received funds in the party can withdraw their funds to their respective banks or use as digital wallet for other items like bills payment, utility payment and more.
- Has other live event games that could help other party guests win cash rewards, the host will set up the game and assign rewards from his/her wallet.




### Non-Functional Requirements <a name="nfr"></a>
- High Availability: Yoo!, Our system can never go down, seriously like never, hence why we prioritizing building a system that will have the bearest minimum downtime if ever, because we afford it. I mean that was what Mark also told Edward when they where building Facebook, I'm a fan of Mark and The Social Network. But how?, well for one, if you've gone through the codebase you'll notice we building an orthogonal system, a loose coupled system with the help of Dependency Injection, Interfaces and Single Responsibility Principle Pattern, to help improve the system fault tolerance as well as having a scalable infrastructure such as deploying with kubernetes with it's auto-scaling and load balancing capabilites to avoid a particular server being choked with traffic. 
- Scalability: We also prioritize this, because our system is basically about the idea of concurrent operation, its part of the reason for the programming language choice `GO` due to its supper power of handling concurrency with goroutine seamlessly without the necessary need of using event driven architecture(EDA) and the use of kubernetes for multiple pods deployment and auto-scaling when there's a spike.
- Low Latency: I mean, Obviously this is really important too, our system can be slow.


## High Level Architecture <a name="hla"></a>
![hla](/assets/hla.png)




## Development Workflow  <a name="dw"></a>
![workflow](/assets/workflow.png)




## Database Design
![table](/assets/tab.png)


## Code Design



## Tools
- Golang with ❤
- Azure App Service
- Azure Container Registry
- Azure CLI
- Docker 
- Docker Compose
- Vscode
- Github Actions
- Goroutine
- Azure Redis Cache
- Copilot/AI
- Kubernetes -> to be used in the next phase
- AKS -> to be used in the next phase


## Technical Challenges

Why working on the websocket connections, we had some challenges keeping the websocket connection alive through out the party duration, and also the issue of recreating a new connection when a new guests joins the party, thereby preventing us to be able to broadcast the new join event to the guest already in party.
The first issue was from the code logical naive implementation, the socket conn wasn't deferred to close at the end of a goroutine, at first for a second I couldn't place why the connection keeps disconnecting immediately it connects, but after a moment of processing the code flow 🤦, I realized I was closing the connection outside the goroutine function that keeps the connection alive. The second arise from the fact that we where persisting our guests to our document database and weren't able to keep track of their connection objects and also creating a new websocket connection pool for the guest.  


## Backend Service Demo



https://github.com/user-attachments/assets/627284c9-3a1e-4ebc-9612-ffa8d519b180


