# React Discord Components

Discord's UI elements created in React.

## Things to note!

> There is only Emoji Picker component available for now, but I am planning to add more in the future.
>
> I mainly created this repo for my other project, which needs Discord's Emoji Picker and I wanted to learn something new :).
>
> This is my first ever library and I made this in a little rush, so be aware that things can break or work not properly!

## Demo

![image](https://user-images.githubusercontent.com/54778147/164888923-1d06a0ab-415b-4d88-a7bd-45e9fc31988a.png)

## Installation

```
npm i react-discord-components
yarn add react-discord-components
```

## Emoji Picker

It should display emojis correctly, but they will not look like Discord's emojis primarily.

In order to get Discord's emojis style, you need to import font [Twemoji Mozilla](https://github.com/mozilla/twemoji-colr), just grab the .ttf file and import it to your website with `font-family: Twemoji;`!

Custom Emojis need an id (valid ID from Discord) and name to be displayed.

### Example

```jsx
import React from 'react';
import { Emoji, EmojiPicker, DefaultEmoji, CustomEmoji } from 'react-discord-components';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [emoji, setEmoji] = React.useState<DefaultEmoji | CustomEmoji>();

  const handleEmojiClick = (emoji: DefaultEmoji | CustomEmoji) => {
    setEmoji(emoji);
    setOpen(false);
  }

  return (
    <div>
      <Emoji ref={setAnchorEl} onClick={() => setOpen(!open)} emoji={emoji} />
      <EmojiPicker open={open} anchorEl={anchorEl} onEmojiClick={handleEmojiClick} />
    </div>
  );
}
```

### Props

|        Prop        |                                                                                                             Type                                                                                                             | Description                                     |
| :----------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------------------------------------- |
|       `open`       |                                                                                                          `boolean`                                                                                                           | Indicates if Picker is open                     |
|     `anchorEl`     |                                                                                                          `Element`                                                                                                           | It needs element for proper positioning         |
|    `placement`     | `"auto" \| "auto-start" \| "auto-end"` <br> `"top" \| "top-start" \| "top-end"` <br> `"bottom" \| "bottom-start" \| "bottom-end"` <br> `"left" \| "left-start" \| "left-end"` <br> `"right" \| "right-start" \| "right-end"` | Emoji Picker's placement relatively to anchorEl |
| `placementOffsets` |                                                                                                      `[number, number]`                                                                                                      | Distance between Emoji Picker and anchorEl      |
|      `theme`       |                                                                                                     `"dark" \| "light"`                                                                                                      | Theme Mode                                      |
|  `categoryNames`   |                                                                                        `{ people: "People", nature: "Nature", ... }`                                                                                         | Custom category names                           |
|   `customEmojis`   |                                                                             `[ { name: "Server name", iconURL: "url", emojis: CustomEmoji[] } ]`                                                                             | Custom Emojis                                   |

### Styling

I am using styled-components for styling and this creates some issues when you try style with plain CSS, so I recommend to use styled-components.

You can export styles classes from the package and use them to style different parts of component.

```jsx
import { EmojiPicker, EmojiPickerClasses } from 'react-discord-components';
import styled from 'styled-components';

const StyledEmojiPicker = styled(EmojiPicker)({
  `.${EmojiPickerCLasses.root}`: {
    // some custom styles
  },

  `.${EmojiPickerClasses.inputSearch}`: {
    // ...
  }
});
```
