import './Preloader.css';

const Preloader = ({isLoading}) => {
  return (
    <div className={`${!isLoading ? 'preloader_removed' : 'preloader'}`}>
      <div className="preloader__container ">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
}

export default Preloader;
