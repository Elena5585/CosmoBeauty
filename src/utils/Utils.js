export function bodyCare(cards) {    
  let bodycards = cards.filter((card)=> card.category.toLowerCase() === 'body care');   
  return bodycards.length;
};

export function hairCare(cards) {    
  let haircards = cards.filter((card)=> card.category.toLowerCase() === 'hair care');
  return haircards.length;
};

export function skinCare(cards) {   
  let skincards = cards.filter((card) => card.category.toLowerCase() === 'skin care'); 
  return skincards.length;
};

export function spa(cards) {
  let spacards = cards.filter((card)=> card.category.toLowerCase() === 'spa'); 
  return spacards.length;
};
export function makeup(cards) {
  let makeupcards = cards.filter((card)=> card.category.toLowerCase() === 'make up');  
  return makeupcards.length;
};

// export function bodyCare(cards) {
//     let count = 0;
//     cards.filter((card)=> {    
//     if(card.category.toLowerCase() === 'body care'){
//       count += 1;
//     }    
//   });  
//     return count;
// };

// export function hairCare(cards) {
//     let count = 0;
//     cards.filter((card)=> {    
//     if(card.category.toLowerCase() === 'hair care'){
//       count += 1;
//     }    
//   });  
//     return count;
// };

// export function skinCare(cards) {
//     let count = 0;
//     cards.filter((card) => {    
//     if(card.category.toLowerCase() === 'skin care'){
//       count += 1;
//     }    
//   });  
//     return count;
// };

// export function spa(cards) {
//     let count = 0;
//     cards.filter((card)=> {    
//     if(card.category.toLowerCase() === 'spa'){
//       count += 1;
//     }    
//   });  
//     return count;
// };
// export function makeup(cards) {
//     let count = 0;
//     cards.filter((card)=> {    
//     if(card.category.toLowerCase() === 'make up'){
//       count += 1;
//     }    
//   });  
//     return count;
// };

export function getSaleprice(card){
  if(card.sale > 0){
    const salePrice = (card.price - (card.price * card.sale)/100).toFixed(0);
    return salePrice;
  }else {
    return card.price;
  }
} 





