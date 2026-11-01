---
title: Cal Hacks 13.0 Recap
date: 2026-10-31
summary: Drones, scrabble, and algorithms
draft: false
---
### Cal Hacks 13.0

![](/images/palace.jpg)

> "Great things in business are never done by one person. They're done by a team of people." - Steve Jobs

I woke up at 8 a.m. on Friday, picked up my team, and drove to the Palace of Fine Arts in San Francisco.

The venue was amazing and there was so many great people. I met people from throughout the States and even those that came internationally from Canada, Europe, and Asia. It was also great to see a lot of familiar faces at the worlds largest collegiate hackathon.



### Our thought process

We had plenty of ideas coming in, but we settled on an AI agent cybersecurity testing platform. We’d all followed the Hugging Face attack and the major PHP vulnerabilities, which led us to a hypothetical. As agentic swarms get larger and stronger, cyberattacks will only get worse. Major incidents are already more frequent every year. So what if security teams had swarms of their own, actively defending a platform instead of relying only on precautions and best practices?

![](/images/sudoko-idea.png)

That became Sudo-KO. In our demo scenario, an attacking swarm targets a fleet of 200 drones while defender agents work to identify, isolate, and eliminate vulnerabilities. The drones were just the demo. The same idea is applicable to any deployed system where an attack can spread from server to server or user to user.

It was a fun project, and we enjoyed talking with the teams at SpacetimeDB, Armadin, and Bitdeer. We didn’t win, but it was my first hackathon submission in cybersecurity.

SpacetimeDB also ran a Scrabble bot competition alongside the main event. My team tested four approaches: a neural net, a classical-plus-ML hybrid, a heuristic algorithm, and linear regression. Linear regression performed best, so we shipped two models, Triplo and Doppio, and placed 7th out of a few hundred in the final tournament.

That result surprised me. Many of the teams near the top trained statistical models on DGX Sparks and GPU clusters. Our best model had 29 weights. The lesson I took away: a simple model with honest evals can compete with a lot of compute.



### Z Fellows Meetup

While we were working, someone asked me to scan a QR code to meet at a creamery near the Palace of Fine Arts. It turned out to be a Z Fellows meetup with Cory Levy. It was completely unexpected. He led a great conversation and gave everyone a chance to pitch one-on-one. I got to pitch, received useful feedback, and heard what others were building.

He also ran a debate on the future of AI, with students from Berkeley, Stanford, UCLA, SNU, and more. I heard a lot of sharp arguments and new perspectives.

![](/images/zcombwcaleb.jpg)

Later we stopped by the Y Combinator afterparty, but we didn’t stay long. My teammates had flights to catch, and we had already gotten more out of the weekend than we expected.