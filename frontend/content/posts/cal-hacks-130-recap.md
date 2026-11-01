---
title: Cal Hacks 13.0 Recap
date: 2026-10-31
summary: Drones, scrabble, and algorithms
draft: false
---
## Cal Hacks 13.0

![The Palace of Fine Arts in San Francisco, home of Cal Hacks 13.0.](/images/palace.jpg)

> "Great things in business are never done by one person. They're done by a team of people." - Steve Jobs

I woke up at 8 a.m. on Friday, picked up my team, and drove to the Palace of Fine Arts in San Francisco. Over the next three days, my team built an AI cybersecurity platform, I won a cybersecurity challenge, and we placed 7th in a Scrabble bot tournament with a 29-weight model, and ended up at a Z Fellows meetup through a random QR code.

![Hackers working inside the Cal Hacks 13.0 venue.](/images/calhacks.jpg)

The venue was amazing, and there were so many great people. I met students from across the U.S., plus people who came from Canada, Europe, and Asia.

It was also great to see a lot of familiar faces at the world's largest collegiate hackathon.

## Our project

We came in with plenty of ideas and left with a swarm of AI agents built to fight other swarms.

We'd all followed the Hugging Face attack and the major PHP vulnerabilities, which led us to a hypothetical. As agentic swarms get larger and stronger, cyberattacks will only get worse.

Major incidents are already more frequent every year. So what if security teams had swarms of their own, actively defending a platform instead of relying only on precautions and best practices?

![Our early sketch of the Sudo-KO idea, with attacker agents on one side and defender agents on the other.](/images/sudoko-idea.png)

That became Sudo-KO. In our demo, an attacking swarm targets a fleet of 200 drones while defender agents identify, isolate, and eliminate vulnerabilities.

The drones were just one example. The same idea applies to any deployed system where an attack can spread from server to server or user to user.

We didn't win, but it was my first submission in a cybersecurity track, so I learned a lot. Talking with the teams at SpacetimeDB, Armadin, and Bitdeer was a highlight too.

## Scrabble models

SpacetimeDB ran a Scrabble bot competition alongside the main event.

There was so much tense comradery between hundreds of models all using different weights and strategies.  My team tested four approaches:

- A neural net
- A classical ML hybrid
- A heuristic algorithm
- Linear regression

Linear regression performed best, so we shipped two models, Triplo and Doppio. They placed 7th out of a few hundred in the final tournament.

That result surprised me. Many of the teams near the top trained statistical models on DGX Sparks and GPU clusters, while our best model had 29 weights.

## Z Fellows Meetup

The best conversation of the weekend wasn't on the schedule.

While we were working, someone asked me to scan a QR code to meet at a creamery near the Palace of Fine Arts. It turned out to be a Z Fellows meetup with Cory Levy.

He led a great conversation and gave everyone a chance to pitch one on one. I pitched my idea, got great insights, and heard what others were building.

On the spot, he also ran a debate on the future of AI with students from Berkeley, Stanford, UCLA, SNU, and more. It went for over an hour, full of sharp arguments and perspectives I hadn't heard before.

![My teammate Caleb and me at the Z Fellows meetup.](/images/zcombwcaleb.jpg)

Later we stopped by the Y Combinator afterparty, but we didn't stay long. My teammates had flights to catch, and we'd already gotten more out of the weekend than we expected.

