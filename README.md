# Tour De France 2017 Infographics
This contextualised inforgraphic art is inspired by the Tour De France event of July 2017 and built with Vue JS and Greensock. 
## Data Structure
Dataset includes two array of objects containing race related data.  
1. stages.json - https://github.com/Krutie/dataRepo/blob/master/tdf/stages.json
2. teams.json - https://github.com/Krutie/dataRepo/blob/master/tdf/teams.json 

## SVG with Vue JS and Greensock
The most notable feature of this work is that it is entirely made using the SVG elements, such as circle, rect, path, g, text etc. 
**Stages** and **Teams** data is arranged within single SVG image using HTML5 animation library - Greensock, and then dynamically updated based on user interaction using the Vue JS Framework.

## System 
Interactivity of this infographic is powered by the rear wheel of the bicycle that arranges all 21 stages of Le Tour Race in the circle. Upon clicking the stage-number, the front wheel will rearrange the team that won the selected stage. Other relevant information about **selected stage** and **winning team** is then revealed on the SVG viewport.

## Live Demo
[Tour De France 2017 Infographic](http://bit.ly/2wSN58y)