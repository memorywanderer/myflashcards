export const DeckLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { isError, isLoading, message } = useSelector(state => state.collection);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getCollections());
    }
  }, [dispatch, navigate, isError, user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Deck id={id} />
  );
};

const Deck = ({ id }) => {
  const { collections } = useSelector(state => state.collection);
  const deck = collections.find(c => c._id === id);

  if (!deck) {
    return <div>Deck not found</div>;
  }

  return (
    <>
      <Outlet context={deck} />
    </>
  );
};

export const useDeck = () => {
  return useOutletContext();
};
