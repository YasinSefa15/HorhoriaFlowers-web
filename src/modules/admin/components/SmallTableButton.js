export default function SmallTableButton({
                                             updateAction,
                                             viewAction,
                                             deleteAction
                                         }) {
    return (
        <>
            <div className="d-flex justify-content-around">
                <i className="fas fa-pencil-square"
                   style={{
                       cursor: "pointer"
                   }}
                   onClick={() => {
                       updateAction(true);
                   }}
                ></i>
                <i className="fas fa-file-alt"
                   style={{
                       cursor: "pointer"
                   }}
                   onClick={() => {
                       viewAction(true);
                   }}
                ></i>
                <i className="fas fa-trash"
                   style={{
                       cursor: "pointer"
                   }}
                   onClick={() => {
                       deleteAction(true);
                   }}
                ></i>
            </div>
        </>
    );
}
