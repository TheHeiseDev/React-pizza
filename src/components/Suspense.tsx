interface ISuspense {
  value: string;
}
const Suspense = ({ value }: ISuspense) => {
  return (
    <div className="container">
      <h2>{value}</h2>
    </div>
  );
};

export default Suspense;
