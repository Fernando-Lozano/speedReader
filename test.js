// splits a text string up into substrings to a desired word count
function listOfStrings(text) {
    const partials = [];
    var starter = 0;
    for (let i in text) {
        i = Number(i);
        if (i === text.length - 1) {
            partials.push(text.substring(starter));
            break;
        }
        if (text[i] === "\n" && text[i-1] !== "\n") {
            partials.push(text.substring(starter, i) + " ");
            starter = i+1;
        }
        else if (text[i] === "\n" && text[i-1] === "\n") {
            partials.push("\n", "\n");
            starter = i + 1;
        }
        else if (text[i] === "\n" && (text[i+1] === "\t" || text[i+1] === " " && text[i+2] === " ")) {
            partials.push("\n", "\n");
            starter = i + 1;
        }
        else if (text[i] === " ") {
            partials.push(text.substring(starter, i+1));
            starter = i + 1;
        }
    }
    console.log(partials);
    return partials;
}


listOfStrings("Old Sultan\n\nA farmer once had a faithful dog called sultan, who had grown\nold, and lost all his teeth, so that he could no longer hold on\nto anything. One day the farmer was standing with his wife before\nthe house-door, and said, to-morrow I intend to shoot old sultan,\nhe is no longer of any use.\n\nHis wife, who felt pity for the faithful beast, answered, he has\nserved us so long, and been so faithful, that we might well give\nhim his keep.\n\nWhat, said the man, you are not very bright.  He has not a tooth\nleft in his head, and not a thief is afraid of him, now he can\ngo.  If he has served us, he has had good feeding for it.\n\nThe poor dog, who was lying stretched out in the sun not far off,\nhad heard everything, and was sorry that the morrow was to be his\nlast day.  He had a good friend, the wolf, and he crept out in\nthe evening into the forest to him, and complained of the fate\nthat awaited him.  Listen, gossip, said the wolf, be of good\ncheer, I will help you out of your trouble.  I have thought of\nsomething.  To-morrow, early in the morning, your master is\ngoing with his wife to make hay, and they will take their little\nchild with them, for no one will be left behind in the house.\nThey are wont, during work-time, to lay the child under the hedge\nin the shade, you lay yourself there too, just as if you wished\nto guard it.  Then I will come out of the wood, and carry off\nthe child.  You must rush swiftly after me, as if you would\nseize it again from me.  I will let it fall, and you will take\nit back to its parents, who will think that you have saved it,\nand will be far too grateful to do you any harm, on the contrary,\nyou will be in high favor, and they will never let you want\nfor anything again.\n\nThe plan pleased the dog, and it was carried out just as it was\narranged.  The father screamed when he saw the wolf running across\nthe field with his child, but when old sultan brought it back,\nthen he was full of joy, and stroked him and said, not a hair\nof yours shall be hurt, you shall eat my bread free as long as\nyou live.  And to his wife he said, go home at once and make old\nsultan some bread-sop that he will not have to bite, and bring the\npillow out of my bed, I will give him that to lie upon.\n\nHenceforth old sultan was as well off as he could wish to be.\nSoon afterwards the wolf visited him, and was pleased that\neverything had succeeded so well.  But, gossip, said he, you will\njust wink an eye if, when I have a chance, I carry off one of your\nmaster's fat sheep.  Do not reckon upon that, answered the dog,\nI will remain true to my master, I cannot agree to that.  The\nwolf, who thought that this could not be spoken in earnest, came\ncreeping about in the night and was going to take away the sheep.\nBut the farmer, to whom the faithful sultan had told the wolf's\nplan, caught him and dressed his hide soundly with the flail.\nThe wolf had to make himself scarce, but he cried out to the dog,\nwait a bit, you scoundrel, you shall pay for this.\n\nThe next morning the wolf sent the boar to challenge the dog to\ncome out into the forest so that they might settle the affair.\nOld sultan could find no one to stand by him but a cat with only\nthree legs, and as they went out together the poor cat limped\nalong, and at the same time stretched out her tail into the air\nwith pain.\n\nThe wolf and his friend were already at the appointed place, but\nwhen they saw their enemy coming they thought that he was\nbringing a sabre with him, for they mistook the outstretched tail\nof the cat for one.  And when the poor beast hopped on its three\nlegs, they could only think every time that it was picking up a\nstone to throw at them.  So they were both afraid, the wild boar\ncrept into the under-wood and the wolf jumped up a tree.\n\nThe dog and the cat, when they came up, wondered that there was\nno one to be seen.  The wild boar, however, had not been able to\nhide himself altogether, one of his ears was sticking out.  Whilst\nthe cat was looking carefully about, the boar moved his ear, the\ncat, who thought it was a mouse moving there, jumped upon it and\nbit it hard.  The boar made a fearful noise and ran away,\ncrying out, the guilty one is up in the tree.  The dog and cat\nlooked up and saw the wolf, who was ashamed of having shown himself\nso timid, and made friends with the dog.\n", 3);