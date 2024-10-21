import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardDetailAgent from "../components/CardDetailAgent";
import { useParams } from "react-router-dom";
import { getDetailAgents } from "../store/detailAgentSlice";

export default function DetailAgent() {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const detailAgent = useSelector((state) => state.detailAgent.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getDetailAgents(uuid));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, uuid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(detailAgent) || detailAgent.length === 0) {
    return <div>No agent details found</div>;
  }

  return (
    <div className="bg-gray-900 mx-auto p-4 min-h-screen flex items-center justify-center">
      {detailAgent.map((el) => (
        <CardDetailAgent key={el.uuid} agents={el} />
      ))}
    </div>
  );
}
