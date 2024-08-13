# Project Styling Parameters

1. [Description](#description)
2. [Font-Style](#Font-Style)
3. [Palette](#palette)
4. [Button Style](#button)
4. [SVG-Icons](#icons)

## Description

## Font Style


 - [Poppins - Google Font](https://fonts.google.com/specimen/Poppins)

| Type | Size | Weight | Spacing | Color | 
|----------|:--------:|---------:| ---------:| ---------:|
| h1    | 36rem, 4vw / max (48px, 5vw) | bold   | 0rem | #2548
| h2   | 40rem |  0px   | 0px | #4581
| p | 20rem | 0px | 0px | #4596


## Palette  

| Type | color |  
|----------|:--------:|
| Light Background   | #4578 
| Dark text   | #4578
| Accent colors Blue| #4578 
| Accent colors Yellow| #4578



## Button Style
### btn:hover style
 - .btn:hover {
    scale: 1.05; 
}


# button style - css 

 ```javascript
    .button {
  background-color: #4CAF50; /* Green background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 15px 32px; /* Some padding */
  text-align: center; /* Center the text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Inline-block */
  font-size: 16px; /* Set the font size */
  margin: 4px 2px; /* Some margin */
  cursor: pointer; /* Pointer/hand icon */
  border-radius: 12px; /* Rounded corners */
  transition-duration: 0.4s; /* Smooth transition */
}
```

# button style - tailwind

```
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

## SVG-Icons
```svg{
    fill: var (--colorprimary);
    width: 20px;
    svg:hover{
        fill:var(--coloraccent);
        scale: 1.05;
    }
}
``` 
## SGV logo
  - Mentor mate logo


##  Link Styles to define:

- Color (default, hover, active, visited)
- Text decoration (underline, none, etc.)


## Snap scrolling to make the scrolling smoother: 
```svg
    scroll-snap-align: start;
    
``` 
  - mandatory: Always snaps to the nearest snap point.
  - proximity: Snaps to a snap point if it is close enough.



