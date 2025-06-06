const StickerButton = ({imageSrc, onClick}) => {
  return (
    <button onClick={onClick} style={{margin: '10px'}}>
      <img src={imageSrc} alt='Sticker' width={50} height={50} />
    </button>
  )
}

export default StickerButton
