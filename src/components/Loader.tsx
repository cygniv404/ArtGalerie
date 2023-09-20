import "../styles/loader.css";

export const Loader = () => {
  return (
    <div className="loading-container loading">
      <div className="img-container">
        <div className="img"></div>
      </div>
      <div className="content">
        <div className="stripe"></div>
        <div className="stripe"></div>
        <div className="stripe"></div>
        <div className="stripe"></div>
        <div className="stripe"></div>
      </div>
    </div>
  );
};

export default { Loader };
