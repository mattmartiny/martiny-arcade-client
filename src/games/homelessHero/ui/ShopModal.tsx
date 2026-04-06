
export function ShopModal({ game }: { game: any }) {
  const shop = game.currentLocation.shopHere;
  return (
    <div className="shopWindow">
      <div className="col-sm-12" style={{ textAlign: "center" }}>
        {shop?.shopName}
        <div onClick={game.toggleShop} style={{ cursor: "pointer", float: "right", width: 10, margin: "3px 10px" }}>
          X
        </div>
      </div>

      <div>Gold: {game.myPlayer.stats.gold}</div>
      <br />
      <div className="shop-section">
        <div>My Inventory</div>
        <table className="shop-table">
          <tbody>
            <tr style={{ fontWeight: "bold" }}>
              <td>Item</td><td>Quantity</td><td>Sell Price</td><td></td>
            </tr>
            {game.myPlayer.inventory
              .filter((inv: any) => inv.quantity > 0)
              .map((inv: any) => (
                <tr key={inv.details.id}>
                  <td>{inv.details.name}</td>
                  <td>{inv.quantity}</td>
                  <td>{Math.round((inv.details.price ?? 0) / 1.5)}</td>
                  <td>
                    {(inv.details.price ?? 0) !== 0 && (
                      <button onClick={() => game.sellItem(inv)}>Sell</button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="shop-section">
        <div className="shop-title">Shop</div>
        <table className="shop-table">
          <tbody>
            <tr><td>Item</td><td>Buy Price</td><td></td></tr>
            {shop?.shopInventory?.map((si: any) => (
              <tr key={si.id}>
                <td>{si.name}</td>
                <td>{si.price}</td>
                <td><button onClick={() => game.buyItem(si)}>Buy</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
  
  );
}