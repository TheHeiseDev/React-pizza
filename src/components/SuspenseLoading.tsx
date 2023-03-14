interface ISuspenseLoading {
  value: string;
}
const SuspenseLoading = ({ value }: ISuspenseLoading) => {
  return (
    <div className="container">
      <h2>{value}</h2>
    </div>
  );
};

export default SuspenseLoading;
