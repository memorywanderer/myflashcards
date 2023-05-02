export const CollectionItem = ({ collection }) => {
  return (
    <div className='collection'>
      <div>
        {new Date(collection.createdAt).toLocaleString('eu-EU')}
      </div>
      <h2>{collection.name}</h2>
      <p>{collection.description}</p>
      <Link to={`/${collection._id}/edit`}>
        <button className="btn">Edit collection</button>
      </Link>
    </div>
  )
}