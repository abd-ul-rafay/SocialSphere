const IconInfoRow = ({Icon, info}) => {
    return (
        <div className='icon-info-row'>
            <Icon className='icon' />
            <p className='small-text'>{info}</p>
        </div>
    )
}

export default IconInfoRow
