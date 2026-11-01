---
title: Cal Hacks 13.0 Recap
date: 2026-10-31
summary: Drones, scrabble, and algorithms
draft: false
---
## Cal Hacks 13.0

![](/images/palace.jpg)

> "Great things in business are never done by one person. They're done by a team of people." - Steve Jobs

I woke up at 8 a.m. on Friday, picked up my team, and drove to the Palace of Fine Arts in San Francisco.

![](/images/calhacks.jpg)

The venue was amazing and there was so many great people. I met people from throughout the States and even those that came internationally from Canada, Europe, and Asia. It was also great to see a lot of familiar faces at the worlds largest collegiate hackathon.

## Our thought process

We had plenty of ideas coming in, but we settled on an AI agent cybersecurity testing platform. We’d all followed the Hugging Face attack and the major PHP vulnerabilities, which led us to a hypothetical. As agentic swarms get larger and stronger, cyberattacks will only get worse. Major incidents are already more frequent every year. So what if security teams had swarms of their own, actively defending a platform instead of relying only on precautions and best practices?

![](/images/sudoko-idea.png)

That became Sudo-KO. In our automated scenario, an attacking swarm targets a fleet of 200 drones while defender agents work to identify, isolate, and eliminate vulnerabilities. The drones were just one possible application. The same idea is applicable to any deployed system where an attack can spread from server to server or user to user. It was a fun project, and we enjoyed talking with the teams at SpacetimeDB, Armadin, and Bitdeer. While we didn’t win, it was my first submission in a cybersecurity track, so I learned a lot.

SpacetimeDB also ran a Scrabble bot competition alongside the main event. My team tested four approaches: a neural net, a classical ML hybrid, a heuristic algorithm, and linear regression. Linear regression performed best, so we shipped two models, Triplo and Doppio, and placed 7th out of a few hundred in the final tournament. That result surprised me. Many of the teams near the top trained statistical models on DGX Sparks and GPU clusters. Our best model had 29 weights. It was really impressive that our simple model can compete against stronger models trained with a lot of compute.



## Z Fellows Meetup

While we were working, someone asked me to scan a QR code to meet at a creamery near the Palace of Fine Arts. It turned out to be a Z Fellows meetup with Cory Levy. It was completely unexpected. He led a great conversation and gave everyone a chance to pitch one on one. I got to pitch my idea, got great insights, and heard what others were building as well.

One the spot, he also ran a debate on the future of AI, with students from Berkeley, Stanford, UCLA, SNU, and more. I heard a lot of sharp arguments and new perspectives for over an hour.

![](/images/zcombwcaleb.jpg)

Later we stopped by the Y Combinator afterparty, but we didn’t stay long. My teammates had flights to catch, and we had already gotten more out of the weekend than we expected.