# hangman-game
The popular Hangman game!

## Play with it

You can visit the site by following the URL: [Hangman game](https://eudesserpa.github.io/hangman-game/index.html).

## Description
This is a challenge proposed by the tutors of the ONE program (Oracle Next Education).

The hangman game is a guessing game in which we will have X number of attempts to, excuse the redundancy, guess a word.

### How to play?
There will be a virtual keyboard and the ability to play with your computer keyboard.
Just press a key and guess the word! 🔍

Initially, the word will be displayed with underscores, with each underscore representing a letter of the word.

Each time a letter is pressed there will be 2 scenarios:

1. In which the letter exists in the word:
    The letter will be rendered in the corresponding position(s), above the underscores, so that we can
    see the letters that make up the word.
2. In which the letter does not exist in the word.
    A part of the character's body will be rendered and the number of attempts will be reduced.
    
For both cases, the letters will be marked on the virtual keyboard with the corresponding colors that represent a miss or a hit, and will be disabled to prevent them from being pressed again.

### End of the game
* Win: When you guess the word before spending the attempts.
* Loses: When you spend the number of attempts and the character appears completely on the gallows.

In both cases, a message will be displayed on the screen telling you if you have won or not.


### Requirements
* Only letters, in capital letters, without accents or special characters.

## Contributing
Pull requests are welcome 😉. 

## License
[MIT](https://choosealicense.com/licenses/mit/)
