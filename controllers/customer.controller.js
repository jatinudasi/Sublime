const Customer = require("../model/Customer.model")

const createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, city, company } = req.body;
    if (!(first_name && last_name && city && company))
      return res
        .status(400)
        .json({ success: false, messsage: "please enter all the fields" });
    const customer = new Customer(req.body);

    await customer.save();
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    console.log(error);
  }
};

const getById = async(req,res)=>{
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id)
        if(!customer)
        return res.status(400).json({success:false,messsage:"enter valid id"})
        
        res.status(200).json({success:true,data:customer})

    } catch (error) {
        console.log(error);
    }
}

const distinctCity = async(req,res)=>{
    try {
        const data =[];
        const customerCity = await Customer.distinct('city');
        const  arrayOfPromises =  customerCity.map(async city => {
            const result = await Customer.find({city}).count()
            console.log("result",result)
            data.push({cityName:city,numberOfCutomers:result});
          })
          await Promise.all(arrayOfPromises)
          console.log("data",data);
        res.status(200).json({success:true,data:data})

    } catch (error) {
        console.log(error);
    }
}

const createCutomerWithValidation = async(req,res)=>{
    try {
        let { first_name, last_name, city, company } = req.body;

        if (!(first_name && last_name && city && company))
    return res
      .status(400)
      .json({ success: false, messsage: "please enter all the fields" });

      city = city.toLowerCase();
      company = company.toLowerCase();

      console.log("city",city);
      console.log("company",company);

      const condition = await Customer.find({$and:[{city},{company}]});
      console.log("condition",condition);
      if(condition.length==0)
      return res.status(400).json({success:false,message:"cant add new city or company"})

     
      const customer = new Customer({first_name,last_name,city,company});

      await customer.save();

      res.status(201).json({success:true,message:"success",data:customer})
      
        
    } catch (error) {
        console.log(error);
    }
    
}


const customerSerch = async(req,res)=>{
  try {
      let {first_name,last_name,city,page=1,limit=1} = req.query;
      page = parseInt(page);
      limit =  parseInt(limit);
      const customer = await Customer.find({$or:[{first_name},{last_name},{city}]})
      .skip((page - 1) * limit)
      .limit(limit)

      //   console.log("data",data);
      

      res.status(200).json({success:true,data:customer,page})
      
  } catch (error) {
      console.log(error);
  }
}

module.exports = {createCustomer,getById,distinctCity,createCutomerWithValidation,customerSerch};