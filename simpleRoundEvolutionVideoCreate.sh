
rm video/simpleRoundEvolution.flv
cat image/simpleRoundEvolution/* | ffmpeg -f image2pipe -i - video/simpleRoundEvolution.flv