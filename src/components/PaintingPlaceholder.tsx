const PaintingPlaceholder = ({ isPreview = false }) => {
  return (
    <div className={`placeholder-card${isPreview ? "-small" : ""}`}>
      <div className="placeholder-card-img" />
      <div className="placeholder-no-image">No Image</div>
    </div>
  );
};

export { PaintingPlaceholder };
