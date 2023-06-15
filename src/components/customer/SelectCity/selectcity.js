function SelectCity(){
    return <>
   
 
       <div style={{boxShadow:"5px 5px 5px", marginLeft:"2vw",marginRight:"2vw"}}>
        <div>
          <div style={{height: "60px"}}>
            <h5>
            <img src="./images/logo.png" style={{height: "50px"}} alt="images" />
            </h5>
          </div>
          <div>
            <div className="row">
              <div className="col-12 text-center">
                <h3>Choose your location</h3>
                <div className="row">
                  <div className="col-3" />
                  <div className="col-6 mt-3">
                    {" "}
                    <div className="input-group rounded">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                      />
                      <span
                        className="input-group-text border-0 bg-c"
                        id="search-addon"
                      >
                        <i className="fa fa-search"/>
                      </span>
                    </div>
                  </div>
                  <div className="col-3" />
                </div>
              </div>
            </div>
            <div className="row m-5 ">
              <h4>Populer cities</h4>
              <div className="row mt-5">
                <div className="col 1 text-center" />
                <div className="col-1">
                  <img src="./images/img3.jpg" alt="" />
                  <p value="chennai">Bangalore</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img1.jpg" alt="" />
                  <p value="chennai" >chennai</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img2.jpg" alt="" />
                  <p value="chennai">Delhi</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img4.jpg" alt="" />
                  <p value="chennai">Indore</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img5.jpg" alt="" />
                  <p value="chennai">Hyderabad</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img6.jpg" alt="" />
                  <p>Kolkata</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img7.jpg" alt="" />
                  <p>Mumbai</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img8.jpg" alt="" />
                  <p>Noida</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img9.jpg" alt="" />
                  <p>Pune</p>
                </div>
                <div className="col 1 text-center">
                  <img src="./images/img10.jpg" alt="" />
                  <p>Agra</p>
                </div>
                <div className="col 1" />
              </div>
            </div>
            <div className="text-center">
              <h5>View all cities</h5>
            </div>
          </div>
        </div>
      </div>
  </>
  
 }
 
 export default SelectCity;