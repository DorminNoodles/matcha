import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";

const Modal = ({ gender, orientation, location, compatibility }) => {
  return (

    <div className="profil-modal" >
      <div id="profil-modal">
        <span>
          <i className="fas fa-trophy" style={{ marginRight: "5px" }} />
          {compatibility}
        </span>

        <span>
          <i className="fas fa-venus-mars" style={{ marginRight: "5px" }} />
          {gender}
        </span>
        <span>
          <i className="fas fa-search" style={{ marginRight: "5px" }} />
          {orientation}
        </span>
        <span>
          <i className="fas fa-map-marker-alt" style={{ marginRight: "5px" }} />
          {location}
        </span>
      </div>
    </div>
  )

}

class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false }
  }

  render() {

    let { username, id, likes } = this.props.values
    let heart = likes === 0 ? "far fa-heart" : "fa fa-heart has-text-danger"

    return (
      <div id="profil" onMouseEnter={() => this.setState({ modal: true })} onMouseLeave={() => this.setState({ modal: false })}>
        <Route />
        <Link to={{ pathname: "/user", search: `?id=${id}` }} style={{ position: "absolute" }}>

          <div className="profil-image-elem">
            <img className="profil-image" alt="username" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIVFhUXFhcaGBUXGBgYFxgXGBcXFxoYGBUaHyggGBolHRYYITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0dHR0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAQIAxAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYHAQj/xAA9EAABAgMFBQYFAgUEAwEAAAABAAIDESEEMUFRYQUScYHwBiKRobHBEzJC0eFSYgcjcrLxFILC0jNTokP/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAlEQEBAQEAAgICAQQDAAAAAAAAAQIRITEDEkFRMhNhcaEUIlL/2gAMAwEAAhEDEQA/AOOQWKG0RJmSKiCQkgAJlKHXoU8Jk1GGoyzQ/BKnIls0G7rmtfYNjh5FKDHM0QewdlF5ExTFdBsFikBRZa06MZRWDZ8t0EVkJ+a0EKFIUTIMKXNGwoazavYcJTtYvWBStCOEa1ieISe0KVrVSag3E1zEWWKMsQOgnMUT2I17VA5qmxXVXaGrBdsmU5rolqElgu2Le6T0B16p59lr05hbGX9YhDEXKyjQ6GfUjP2QRh908PQrojlpRodT4pQofXJFQocwOFevBKAyR4ddcUJAvZ11zUNxmrSLA73JBWiFJAQkyuKS9uoUkyE252CHknWg96WSaHSwQaRjc1fbEsZe4UVLZ2FxC6B2YsMgCQo1WmZ5aLYlhDQFpLPDVdYgraCsHTPSVjESwKNslK1A6lYFK0KOGiIbEy7x6wKZrU+HBUvw1UiLTNxRPYig1JzVVhSq57VBEajozUJFULlVtpZPl6rD9r4Xcf8A0k+C38Vqx/aqF3TwSns76cqiig6zQW7JvAnzkjYlDunh5kIfdm13P/56C3jmpWO6U7p11mpiy+SFhmT+M/v7FGteJDW9NLx0Mmvh9us0Ja4VPPxqrJ1CdCKcaU8ih4kqi8A/ceiCVAhDGVKJKeLBM+SSOgEXXlPamQ21UmMkzi62BYzEfS4euAXSbBB3QAFnuy9g3IbSRU1Wk+MGiZoFhq9rfEW9lRLrcxnzOA4lYu27fe7uwqDNAMDyZyJOJNT9lLeS10Vm1If6lI3a8P8AUud/AinB33TvgRcWxPOWV6ZXLp0La0L9YR0DazMCuVQrO8CYJ8/dW2zy+hmZ+R4pdL6OnwdoNKm+PNZbZ7zSat4MROaTccWYiJkSNJNaaIO0RVVqJOnxYuKDi2xgvcEHbLQVl7dvmZryv6+yj7NZhpbRtOGL3hZftHtSEWnvKlfYorzMl3Xqq3aWzo27e4jhTzThXwy20Yo+ISOsUze72QPvNR22E5rjMJMdMDRbRz02PTddLL7e5UrH96U+HICR8EyM3eBF1QRzp7DwKga+RaTpPy+yaKsw/HD7UPlXkh3uImScwdcDzpNKDFqRPXncfOabaRSeBFeLfwPVAeQLSAJED8JKvM8EkETQitkwd+KBqoSJCenqrPsrCnEnqlfSp7dCsjJABT/6MRD3jTJNgNVhAbJYumH2HZcFn0BWsODDH0jwVREtUjJMftMDFTY0laaEGfpC9ihl0gVnbPtOaIibQCOXg7Fg6CzJetgNyCr4NtBxRsGKClwxsJH2cqtY5H2RyE1av+RVdocrR3yKltjqqtIyHiCaHdZ25KWI+QVfa7duqY06NbBbimWyFDlUDK5VTNpid80PbtpDiq5U2xmO2lmaagD8LCEyMsOuua2+3rWHArC2m9aYY/Idv09f8cFBGEneHon71a3FRxKHgB6LRlU7X3HL3p7eaJa4kFt5lTiLvH3QUM0I66nLxT4cW7wPK5BBYoqkjYsOZn3TzSQEUW6XDrzV32U+dUBK0PZJnfdyS16PPt0Oxw5gImKZBN2c25WjrMCFg6Yw21tobpqZKuh26eM1qdvdlxGGSxMfsnGY47jRIYgumrnE26npdWe3noFSP2k6X4Wds+xbY526ARqDpgjH9mLY5lchSec/t5p8ynu/0sm7c3byPEK77MbcZGiCGHd7L7Kh2N/D9z//ACOlT6ZGs9Rd1w3nZzsjDgPa6Uy24yHCplVRbPw0zNe74W4gyU9kvkpo0OqjhNk5Tw+9W7j3FS2kTcrXe7slVxR3k6nIUwSaLle3e0AEZzS4iRlKRrKnguxwWyKzW2uxlniuLnMqZ1Rm8Vry55Z9qb1WkHRTxra8jrrBEbY7BbsnQpgYqjjdnbY2gmefXQWkuWWs7iK3xCRULM2g1V1adk2kCZDvH7KutGyooqWq5Yzv2/QRrqKSK6ddB6BRhsjJTPZLyTJFjonOOOaaQvR+UBI2LqkoCkghUAA0N2eRWg7JAiKWnJUMAV0V92cdKO0aS8pj3U30qe3TdnBXMNqpdnuV/ZGzWPXTDvhUTTYQcEa1ikDEDqvh7PAwHgi/9E04IlrERDYmXQsGxjJF7oaKJ6iiIL2HeFAy9SxXKCGapHxYD5VXRT3kaHUVfHNUUSCYSJlNBwXIpiIZr4IyQsSxtyCsJJrmIJRWjZjD9I8Fn9u7GaW3LbxGSVFt14YxznG4dS5INwrtDZfhxCBggXumTxV5tsTDopHzGQGZNT4LPxBIkZE9eK3z6c2vZH19UwJ4qmkJkaQknNcUkEOgXc/ZHbPibsSG4m50uRogLLceR68VI992aVN1jZ0a5aaxRFhNhWreY06Ba6wxVjY6c1fMeiGIGC9Fw3KYqiGhTMCgaVMxypNPKhiqYuQlpiUKKIBtUVRQHVQ7nTM1PZ1NXxYQyhLWMVZbOlWeSCtgQQazRqyKtIapZK0s0SYTKwaE00SY5Me5MuILRE/C57/EDaMm7gNSfE318StrbrTugmVwMlxXtpbTEjkAzDRInCZJn7Ik7RrxFbtC2b8g35WDdaM3YuKqozJHdxlM+Z9KouC4DvymBQDN0qcsf8qBjDvbzsQeczInzW08Oag3XzCe5MdSXBObkmDd0pJxC9QElmdXkn2j/CiaZGeGSIhs3qeHsgRquyNsm3dyW7sEW5cl2BaCyLLNdN2bGmAstNcVrLNFR0NypLHEorWA5Q1HtcpmuQjHKZrkBNNCbSHccdEUCmRu8C03ESTEZ+E8IKJ2ks7Ynwvit3sp3cTcCiImyIsyN8bucjvS+69Z2VgbktwTzxUxdHN2m2V6qtr9oYcJpc9waPM8BeUxvZ6KzuteC3CeCfC7KNM3RTvu8hoBgguPNlbbhRoe8x0xqCCOINyvNlum2eE1Rw+zQaf5Z3Qb6ei0tkhBjQ0YBAqYFNe5IrD9ve2Ys7TBhGcYipwhg5/uIuHM6tNBfxB7UfBBhQyDEcKY7gNC46nDxXLQxz3Bt5J8z7nrFeRoxJdEeSSTOpmSeN/NebKtwZFY91294ay8FrM8jG67fLqVl7LQ4VmEJ4BLhMu1lM8JYFc72rD3HOaZTAEjcJE06+y6ts+3CMwNB+YX/t690B2h7IMjQyWnce2jXcB9WYUz5P2vXw/mOORTXrGqaM0TtGzPhxXQ3iTmmR+40Q7MRl0StWD14SW12D2Q+LBER7t0kmQyGq8UfeL+lUO29l/DMxd6de6AgHBbvalmDmESnd4GnXDWuIjQCx8uiFY3nhRnyc1+IIn43roewLTMBc+e2YktH2UtX0G8XajRTqeCy6VY3q1s71n9nxphXEB6xroi3hFTAoOC9T7yQEByRcoN9MfGkg05cmiKFXR7YBeh37QACONM4tXgitzUcSOFRP202Xyief4CjG0posVPhq+bECk+IqKBtIKwbaQQkjWbAPa7bws0AvEt902wxm446NF5P3XDbdFcXF7nFzjUuN5Jx4rTdrNs/wCotD3fRCJYwYE55VlTjosxAsroz90Vmb9ReeA91rmcc+qBjtmN44mQHqVALvFWW2SJgA0FG8BOZ5mvAhVjXLSMq1XYntF8CIIcQ900BOGnBdl2fFbFBymDPQtH2K+e4Ng3272JnIe63n8Pu0pbKzRTIgyBOIH2kVnvP5jX4/kv8a1nbHsRCtY3m9yMBIPzxk4Yj0XHdq7Ii2SIYcVsnfSb2uAxacQvpCzRQ8BV23tgwrQwsisDgc7wcwbwdQpzvn+FXHf8sp2PtEKLZWPoTcZ1kRQjRJUUfsHaoLnNs8aUMmYDiQZmlZAzuFUkr9f2fn9CSK3YGmWYl15rP7b2XMAgcOsj+FoWDOhpM4ftcPJKJDmC0io9c+sl0CzrnzwRQiWvWGnNOslpdDcDhPqS0Vr2XvNnjjP0VHEh7s2uBHmOeRSY3NjebA2kHgEHjoVq7LEXIdm2swnTBlpgV0PY21WxWgg1xGRWWo0xWthOU3xFXWaPNE76homiWiSprftlraTVhEhBwkVQ27YMMGYmdCSnFyeQdo2u28nmqd/aUF260F3I+pV8ywwwPlCns+zwcEO3OLzxWVj7UjAzDJjmmHtAW0dDfxAJWzfYWiU5VSiWFuiO/wBj/p6/9f6ZWBtjeANQNQR6ouP2l3ITxOu6fGUkfEhNkZgSyosx2os8P4TiGNDqCYpjfROMPnzyMuYp3AdXHi52PIAeKs4W7BhZOIvukDMeZ9Sq2K2rGYCp5y+yH2paC47s7r9SNVpx5wO1xt5xKiavQK9YJBWzWllt+40nGUuAyQTrQ8O3/qBmJXgiUq4FeQaH2UkaHOQbMjrBIOufw97RxY8Ob2fKd3euDqLojXzaubfwyk2zASuc6fj/AIXRbMKUukue+/Dpn8Z0FaDVJSRm1SUrc0OBEhfKk+LeGSRdMDdobpH+0+yY12I4SN5GROYzUgr3h3r5ildCP1BdhPAydQMLsxkdRO/7Ie1bNY/vSvF2J/OHJGtkaivG8jM/uHtqnUo4DC4TqBfTBwp5I4OMha9hm9lRgELZbVFs751GYzW5LAai7Icq8dOHBQ2qwMeJOAIwPK6amxFx+lhsHbTYrQQa4jLktDBizxXNH7IiQXfEgOu+k5ceav8AYfaYOd8OL3HihBWWsiWz22zCm2iBMJlkihwmDNGsCitZWXtLXNM3AyzC8hWgS+YLWizgiRAUETs3AfUsCbXPz3LNOtLMXBQxre2XzBapvZKzD/8AMJzdgWdppDbPglw/+Vf0w7d+KZMaZfqN35Vft+yfy5HMX6Akdaro1rgtY0yAHBc+7YWnc3R+6ZTz7YfNu6naxlrbulxN4B8TM+iqHNv64+3iri2v3jLMg5znSXWarIzJnn459cFtHLQQF5TrO0HRFwbI51BeZ+QJn6I1ux3AdXqikBwmDj15oqE8wyHXtOJrpIn3XkWxmZNQM+vX1U1nYKhx8pgjUZ+vmpV6bXs3tdsMdwAAmZGslutl9oobhJ/cNL7q6ri8CcMgVIw9uS0Fht5deZjGV5Oox4JfWVpnXfDrReDUGmYK9XPIe13sG6IhAyAaZaVSUf0qvyqIUSZrLewdgRkepjgjGOJMwJuxGP8AnEG4zVDZ48sJ6Z8VawooOQOB85HrUZLcpRTYkpubjKeFx+Ya6eyl+IPmAncTIi67eAPPzQ7BjWeLRLK+6rpVGBlcpGPlUS3TfKoBunLLAhNSfelUc5ZZjlgnNGdxFRgJ3cj76KOEd06E0yGdcj1cnTkZVlcLp6t0/ASNIG1kTPHrW7jNBbQ2XDiCZEnC54oR+LkUADNs5Yz0wM8Jekl7yqL9dPfgUcHOgtm7Si2V27GM2YRMOeRW5se0WvbMHDksmQHTYZFpFLiK4HQ0lxVI8RLJN7CTDnVtTu/gLLWU+nXILxSSMhxVh+znaRkRo70jkfX8rVQrRRZ+jqwMVQuKg+OM0NaraALx40R0og2taAJVoKnwP2PguQdsdob8UAGgwyOXhLxWg7XdqW1ZDM3Zi4YV6zXP4sQuO8VeZ+Ub1+BsFmtfTDxU7oImALhTjSc/GXgq9kTAK5s0GZkL544C/wBvJWz50bs6yBtZV8bh5o60yDQc5UvM7+ZHlJNsRlSUyfQ64DDklaZB2ZrhlgBgPzmqaycjyxwAW97Gt1J8MXeyr7fs/wCqREqgH1drUq7sgDW7xN1wy4ZuXlqgFwmaATO7OQlmT41QfOxkIpPrffz6wRdijm7G788ZYr3acKvdF5lOtTzwomshSpWdOIkaeiTPnlasiFokIgA/cJk68EkK2E4zO8ZzrdfzSTX1T2G1h2Mjl9lbQY0iFiWPkZhX1g2iH0ND6pss7ayDG14Eiox5jHqpUJwqbs8R/VqJSnpVUNli3D1u4K2gxOd/+OvcobSjGNFx+U3Y/wC2uWHHVPhm8YyvBvAlJ1PRQQyLqyNxyOWdLxzGClaTKf1NvGn1AjK489EKh9aGsxhLHEa50yTgJEfulUeVORHJJkUb0waHG+spjrNKQM2gUnSZAkDKWk5yGKZvQRUY3jA8j5T1C8cQ4VF9DkDX1qJcEnRJhp1rrOhxlP8A7L1zj3qXScL+cqXTxSDF7VgPssQRIX/jJu/SThwr5FaTYPbcbu7EMpC/BTW2A17SHChp5TuWF2jYDAeS006odFOs9Y67l0e1dr4X/spjI3rL7b7VmIC2EBLF2mQJWPjd6oEsxhgm6TnoLlMxE/eiIsSdZzOJTd4k05BTwNnRXykw1uw6/KvLP2dIAmJuOVwzv4EBVwTNqu2fZC53qcAAtPBsYaO7eL53A66mnCYRNlsoY3cbfeTSl5n6y5FTDdA3QRvZk3Tn3jhPIJ8a5zxFuhtGzmakkymDidPuhWyc/EyvIrvHTQYlTWsyHw4c5uvzM764DW+midY4QYAL3HDq7qSDqZrAJF0iZSAAnIT+Vou9qJRiPmfdg2pJIx44pTlf3nZXDlkENGv73ecbm5csuOdUzAWhhiPBAk0U/wASuwXhYJdwVzN1cJ48Ap4pH1HD5Rd/uPsgbRaBnOXIfm5JFrxzWmpDnHMEgcBW5JVcbarZ3n1SQj7xnV610qpqSpztDsq37wkT3vVaOxxJiQXP4T5EEGS2GxrSHiY5+CTbGutJCnhf7016mVJOoInUD8c5TChY2kpdXe6kNxMtR/d/2Q6IkDBIjIU4GrT7Y3p5dOTupGeJ1n4qIOIdMCh8ad6Q1kZJNdJrgLwTTnPq5M015c3nI63iuuHFMhmZGoPXQ4J9zhwuurMHBRy+X+ojIzuv60QDAaXZXSxBHqqftDZwYT3ZNNeU1bgUE6zp4Ol1/lVu33fyHtxIlTXdCVRqeGY7PbH+LV5k2s9QJTr1ctZYdlQocgGNoJmdTPD3PBM2bZwxktGiegkEe6YDpYndF9w7umE0FjMkPhAVdhcNRnfjPnMJMdIFxlMyuFMgAZS8KyATopuaeYpcNOJNy9d8xu7t2RJE68AhoYYe6DOribszSchkBwuCjiQg0SEt49TJvlTnJSti03zWkm1ru0kBqeKbvEX95zs+qAICCGyV1XG+eUrz9uFykZQlovNS4ypS/ThwTwZUF95Jw1OuQmo4jxKTaAXuv3TjxcgjYndmGVI+Z5w/On+EHGjynLH6jeddAhrVtOXdBoOpuzzWd2ltiZIaZn9X2Qz1uLDaG0Ws45LP2m2ufQ3ZIZ7y4zJmSnAJMLq0t1JIvSQlCF7JODU6SfQjIWh7HudvkfTLzNFnitX2SgyY5+JMvAGUuaF4n/ZqAKGud+k8OHoFKL5Sp5/N9nVQzXVI0F+ocPdOa6ZacZG+n0tKbqidpo2kpFoPm03cr1Iy8jAy1/bwKHP1A31Mv6u8PTBSzqBmDpgDjr/hBnMnJtJiYFNZpB0p6OHnLLn7Jv0m+QJ5CYNOvZexXTLuR9eGQQDH00q7xoZ+3RQG1LgM3DwBn/xRzpd4UvOV+5p15qrtzpxIYyJJHXFKo0OgtuF11ObuuSlaLhm8zlmCTWU8+rlHDN1cR7/bFObXdF9XecvvlmiHErXSJdg0Suy7x+3+UvpAr3vS91ZyTAJg/uPq6/DJTb3eM/0y8TXGfqhTwd51bgLtTdTGQGt6jMShdi7MGjRdxv8ANegzaf3GeIvP2BXjzplrqUwCj20tEgDI4zq7Mk4KntlsdUuMmi4C5aCJAaZzvWN7TNc0gYY6pMt2yK227Qc4yFG5ZoJeL0JubvfZwSLk1IJcCVsl4o5pI4QghMdwTfiLwzKRvJLYdn3Sgyuo7xWbsFkLjdTFauwiQAF13Xgm1+OeerERBvcvcGvIr1lw0P8Aa6XuFAw/KTqP/mUj4KScw+mJMjrW/j7ptxUN9ZTvaPIlt9xCdDdRnEX0vBGHDNRmJJwM50J1oQ7Hil9Ixk6/g7X+pBppjvCeR8p48EojpgnNtcZ6zuTHmpFLsJXVHWCY4yE/2Y/n7eSAe58p5T/46cVV2iL/ADmn+rwmEbaHmvE38lU2t8orD+13r+EqjS4hPHOYyyPXNPhv+XKR9WzQ0N1RTLPXJTCKKaNPtjihR0N9GC+88wNJ5pxiUdI4ulrIbvumNMt1p/SZ5mjRRKL8rtS6Y/3BM02+e62Qz8ABjfUr1xl4nHUjFRF/e5GhzJlpSij+KN3nPH9RQEr345SvOmPnVA7asbYrS001yniiHmp6zXlpfPyn11xQVnY57bbE6E6ThwOB4IZbm22VsVu64TljiDosdbrI6E4tdyOYzQ5t44HmkkvEM3qS8SQDgpGJJJU4vtlfIVa2Y0HELxJEb/H6GAXcT6uTIRv/AKW/2pJJtRDxJzJZO/sClPyu/r9XCaSSDJh77uv1JfQ0/s/5BJJADWkqptZ/nQ+foF4klUbXjRdw9ylZBMievskkhSV17f6f+qjin+W7i7+8JJJn+Cae8P6W+pTpUby/vKSSKKhjGjuJ9XJ8Y97rMJJIKh3ivMeqz/aUdxpx3yJ6ZJJIZ/J/FnUkkkOYkkkkB//Z" />
            {this.state.modal === true && <Modal {...this.props.values} />}
            <div className="profil-bottom">
              <span><i className="fas fa-envelope" /></span>
              <p>{username}</p>
              <span><i className={heart} /></span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export { Profil };