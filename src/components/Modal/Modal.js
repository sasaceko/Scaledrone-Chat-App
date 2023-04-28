import classNames from 'classnames';

function Modal({ error, darkMode }) {
    const handleCloseBtnClick = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    return (
    <div id="myModal" className="modal">
        <div className={classNames("modal-content", darkMode ? "dark" : "light")}>
            <div className="modal-header">
            <span className="close" onClick={handleCloseBtnClick}>&times;</span>
            <h2>Pažnja</h2>
            </div>
            <div className="modal-body">
            <p>{error}</p>
            </div>
        </div>
    </div>
    );
}

export default Modal;