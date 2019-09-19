const models = require('../../models');

exports.index = (req, res) => {
  const user = req.user;
  let totalAmount = 0; //총결제금액
  let cartList = {}; //장바구니 리스트
  if (user) {
    if(typeof(req.cookies.cartList) !== 'undefined'){
      //장바구니데이터
      cartList = JSON.parse(unescape(req.cookies.cartList))[user.id];
      //총가격을 더해서 전달해준다.
      for( const key in cartList){
        totalAmount += parseInt(cartList[key].amount);
      }
    }
  }
  res.render('checkout/index.html', {cartList, totalAmount});
};

exports.post_complete = async (req,res) => {
  await models.Checkout.create(req.body);
  res.json({message:"success"});
};

exports.get_success = (req,res) => {
  res.render('checkout/success.html');
};
