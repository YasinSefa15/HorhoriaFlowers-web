export default function SmallTableButton({
                                           updateAction,
                                           viewAction,
                                           deleteAction
                                         }) {
  return (
    <>
      <div className="d-flex justify-content-around">
        <i className="bi bi-pencil-square"
           style={{
             cursor : "pointer"
           }}
          onClick={() => {
            updateAction(true);
          }}
        ></i>
        <i className="bi bi-file-text"
           style={{
             cursor : "pointer"
           }}
           onClick={() => {
             viewAction(true);
           }}
        ></i>
        <i className="bi bi-trash"
           style={{
             cursor : "pointer"
           }}
           onClick={() => {
             deleteAction(true);
           }}
        ></i>


      </div>
    </>
  );
}
