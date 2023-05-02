import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCollections } from "../features/collection/collectionSlice";
import { Spinner } from "./Spinner";
import { toast } from "react-toastify";


export const DeckLayout = () => {
  const { id } = useParams();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const { collections, isError, isLoading, message } = useSelector(state => state.collection)
  const deck = collections.find(c => c._id === id);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getCollections())
    }
  }, [dispatch, navigate, isError, user])

  if (isLoading || !collections.length) {
    return <Spinner />
  }
  return (
    <>
      <Outlet context={deck} />
    </>
  );
};

export const useDeck = () => {
  return useOutletContext()
}