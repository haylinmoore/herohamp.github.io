# Ai Recolors New Mexico State Flag

Before reading this try it out here: <a href="/creations/new-mexico.html">/creations/new-mexico.html</a>

### Intro
I'm bad at design, but good at programming. Which means I am very good at design. If your first response to that was "That makes no sense, you just said you are bad" then you are kinda correct. The results were next level, but they were pretty good.

### Backstory
I was looking at state flags one day and came to the realization that the New Mexico flag one of the only good looking flags. I only had one issue with it, the coloring. I don’t know what about it I did not like, but I just knew I did not particularly like the color scheme. After a bit of time, I had an idea. Since I don’t know what I like, why not have a computer do it for me. 

### How?
It is super simple. First, it generates 2 random colors, then it using some JavaScript Magic renders it onto the user's screen. Then the user has four choices, Love it, Like it, Meh, and Hate it. It then feeds the Neural Network a value, 1 for Love it all the way to 0 for Hate it. It uses this in the future to find the perfect color scheme. The user then continues to do this for as long as they wish. Once they think it has been long enough it gets tired, then click the dandy “Generate” button. That runs 200 thousand rounds of generating random colors, sending it to the trained and personalized neural network, and save it to an array. After all the simulations finish, it then finds the color scheme with the higher score and displays it to the user.