const Demo = ({onClickButton,text}) => {
    return (
        <div>
            <h1>Hi, This is Demo Component</h1>
            <button onClick={onClickButton}>{text}</button>
            {header}
        </div>
    )
}

export default Demo;