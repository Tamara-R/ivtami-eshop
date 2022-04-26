import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Carousel } from 'react-bootstrap';
import { getProductDetails, clearErrors, createReview, deleteReview } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions';
import MetaData from './../layout/MetaData';
import Loader from './../layout/Loader';
import { NEW_REVIEW_RESET } from './../../constants/productConstants';
import { loadUser } from '../../redux/actions/authActions';


const ProductDetails = ({match}) => {

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const alert = useAlert();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { loading, product, error } = useSelector(state => state.productDetails);
    const { error: reviewError, success } = useSelector(state => state.newReview);
    const { user } = useSelector(state => state.auth);
    
    

    useEffect(() => {

      dispatch(loadUser());

      // if (error) {
      //     alert.error(error);
      //     dispatch(clearErrors());
      // }
      if (reviewError) {
          alert.error(error);
          dispatch(clearErrors());
      }
      if (success) {
          alert.success('Review has been posted!');
          dispatch({type:  NEW_REVIEW_RESET});
      }

      dispatch(getProductDetails(match.params.id));

      
    }, [dispatch, error, reviewError, success, alert, match.params.id]);

    const increase = () => {
      if (quantity >= product.stock) return;
      setQuantity(quantity + 1);
    }

    const decrease = () => {
      if (quantity <= 1) return;
      setQuantity(quantity - 1);
    }

    const addItemToCart = () => {
      dispatch(addToCart(match.params.id, quantity));
      alert.success('Item has been added to cart!');
    }

    function setStar() {

      const stars = document.querySelectorAll('.star');
      stars.forEach((star, index) => {
        star.starValue = index + 1;
        ['click', 'mouseover', 'mouseout'].forEach(el => {
          star.addEventListener(el, showRating);
        })
      })

      function showRating(e) {

          stars.forEach((star, index) => {
              if (e.type === 'click') {
              if (index < this.starValue) {
                  star.classList.add('orange');
                  setRating(this.starValue);
              } else {
                  star.classList.remove('orange');
              }
              }
      
              if (e.type === 'mouseover') {
              if (index < this.starValue) {
                  star.classList.add('yellow');
              } else {
                  star.classList.remove('yellow');
              }
              }
      
              if (e.type === 'mouseout') {
              star.classList.remove('yellow');
              }
          })
      }
    }

    const submitReview = () => {

      const formData = new FormData();
      formData.set('rating', rating);
      formData.set('comment', comment);
      formData.set('productId', match.params.id);
      dispatch(createReview(formData));
    }

    
    return (
      <>
      {
        loading ? <Loader /> : (
          <>
            <MetaData title={product.name} />
            <div className='row f-flex justify-content-around'>
              <div className="col-12 col-lg-5 img-fluid" id='product_image'>
                <Carousel pause='hover' >
                  {product.images?.map(image => (
                    <Carousel.Item key={image.public_id} >
                      <img 
                        src={image.url} 
                        alt={product.name} 
                        style={{maxWidth: '80%', maxHeight: '75vh'}}
                        className='ml-5'
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>
                <hr />
                <div className="rating-outer">
                  <div className="rating-inner" style={{width: `${product.ratings / 5 * 100}%`}}></div>
                </div>
                <span id="no_of_review"> {product.ratings} ({product.numOfReviews} Reviews)</span>
                <hr />
                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decrease}>-</span>
                  <input type='number' className='form-control count d-inline' value={quantity} readOnly />
                  <span className="btn btn-primary plus" onClick={increase}>+</span>
                </div>
                <button type='button' id='cart_btn' disabled={product.stock === 0} className='btn btn-primary d-inline ml-4' onClick={addItemToCart}>Add to Cart</button>
                <hr />
                <p>Status: <span id='stock_status' className={`${product.stock > 0 ? 'green' : 'red'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                <hr />
                <p id="product_seller mb-3">Brand: <strong>{product.brand}</strong></p>
                <p id="product_seller mb-3">Category: <strong>{product.category}</strong></p>
                <hr />
                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                
                {
                  user ? 
                  <button onClick={setStar} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                    Submit Your Review
                  </button> : 
                  <div className='alert alert-warning' type='alert'>
                    Login to post your review!
                  </div>
                }

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">

                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars" >
                              <li className="star"><i className="fa fa-star"></i></li>
                              <li className="star"><i className="fa fa-star"></i></li>
                              <li className="star"><i className="fa fa-star"></i></li>
                              <li className="star"><i className="fa fa-star"></i></li>
                              <li className="star"><i className="fa fa-star"></i></li>
                            </ul>

                            <textarea
                              name="review"
                              id="review" 
                              className="form-control mt-3"
                              value={comment}
                              onChange={e => setComment(e.target.value)}
                            ></textarea>

                            <button onClick={submitReview} className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {
              product.reviews && product.reviews.length > 0 && (
                <div class="reviews w-100">
                  <h3>Reviews:</h3>
                  <hr />
                </div>
              )
            }

            {
              product.reviews && product.reviews.length > 0 && 
               ( product.reviews && product.reviews.map(review => (
                  <>
                    <div class="review-card my-3" key={review._id}>
                        <div class="rating-outer">  
                        <div class="rating-inner" style={{width: `${review.rating / 5 * 100}%`}}></div>
                        </div>
                        <p class="review_user">by {review.name} </p>
                        <p class="review_comment">{review.comment}</p>
                        
                        <hr />
                    </div>
                  </>
                ))
              )
            }
            
          </>
        )
      }
      </>
    )
}

export default ProductDetails;