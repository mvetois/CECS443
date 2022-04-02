const ThemeToggle = ({
  colorOne = "white",
    colorOneToggle = () => {},
    colorTwo = "black",
    colorTwoToggle = () => {}
                     }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
           <div
               style ={{
                   backgroundColor: colorOne,
                   width: 30,
                   height: 30
               }}
               onClick={colorOneToggle}
           >
           </div>
            <div
                style={{
                    backgroundColor: colorTwo,
                    width: 30,
                    height: 30
                }}
                onClick={colorTwoToggle}
                >
            </div>
        </div>
    );
}

export default ThemeToggle;