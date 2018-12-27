# ripple-image-affect

## Purpose


### Step 1
Using array matrix to create matrix data
use npm array-2d to construct 2d arrays

check file ./simpleEvolution.js

create instance simpleRoundEvolution to simulate frame evolution:
cell value = up, down, left, right's value sum from last round

every round is derived from last round

### Step 2
print each round's matrix into image by pixel color
there are 8 colors 0 - 7, sum value of (rounded cells and itself) % 8 -> next round's cell


### Step 3
Using ffmpeg to convert images into flv video.
check file ./simpleRoundEvolutionVideoCreation.sh


### Notes 
output images produced into ./image/its category folder

output of video produced into ./video