import React from "react";

const Progress = ({done}) => {
    const [style, setStyle] = React.useState({});
    setTimeout(() => {
      const newStyle = {
          opacity: 1,
          width: `${done}%`
      }
      setStyle(newStyle);
    }, 1000);
    
    return (
      <div class="progress">
        <div class="progress-done" style={style}>
          {done}%
        </div>
      </div>
    )
  };
  export default Progress;