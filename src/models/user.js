const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'prueba_node',
    port: '5432'
});


const getUserById = async (req, res) => {
    const id =req.params.id;
    if(!id) res.json({
        mensaje: 'El campo id es obligatorio'
    });

    const idNum= parseInt(id)
    console.log("IdNum ", idNum);

    if(isNaN(idNum)) res.json({
        mensaje: 'El id debe ser un numero'
    });
    
    const response = await pool.query('SELECT id, username, active FROM users WHERE id= $1', [idNum]);
    if(response.rowCount>0){
        const user= response.rows[0];
        if(user.active) res.send(user);
        res.json({
            mensaje: 'El usuario no esta activo'
        });

    } 

    res.json({
        mensaje: 'No se encontro ningun usuario con la id '+idNum
    });
            
}

const deleteUserById = async (req, res) => {
    const id =req.params.id;
    if(!id) res.json({
        mensaje: 'El campo id es obligatorio'
    });
    const idNum= parseInt(id)
    console.log("IdNum ", idNum);
    if(isNaN(idNum)) res.json({
        mensaje: 'El id debe ser un numero'
    });
    
    const response = await pool.query('DELETE FROM users WHERE id= $1', [idNum]);

    if(response.rowCount>0){
        res.json({
            mensaje: 'Se elimino el usuario con id '+idNum
        });      
    }else{
        res.json({
            mensaje: 'No se encontro el usuario con id '+idNum
        })
    }
    
}

const updateUserById = async (req, res )=>{
    const id =req.params.id;
    if(!id) res.json({
        mensaje: 'El campo id es obligatorio'
    });
    const idNum= parseInt(id)
    console.log("IdNum ", idNum);
    if(isNaN(idNum)) res.json({
        mensaje: 'El id debe ser un numero'
    });
    const { username, password, active } = req.body;
    if(username==null || username=="" ){
        res.json({
            mensaje: 'El campo username es obligatorio'
        });
        return;
    }

    if(password==null || password=="" ){
        res.json({
            mensaje: 'El campo password es obligatorio'
        });
        return;
    }
    if(active == null || typeof active != "boolean"){
        res.json({
            mensaje: 'El campo active es obligatorio'
        });
        return;   
    }

    try {
        
        const resposeUpdate = await pool.query('UPDATE users SET username=$1, password=$2, active=$3 WHERE id=$4 RETURNING id', [username, password, active, idNum]);
        res.json({
            mensaje: 'edicion exitosa',
            user: {
                id: resposeUpdate.rows[0].id,
                username: username
            }
        });
    } catch (error) {
        res.json({
            error: error.detail
        })
    }
    res.json({
        mensaje: 'Se edita a '+idNum
    });

}

const activeById = async (req, res) => {
    const id =req.params.id;
    if(!id) res.json({
        mensaje: 'El campo id es obligatorio'
    });
    const idNum= parseInt(id)
    console.log("IdNum ", idNum);
    if(isNaN(idNum)) res.json({
        mensaje: 'El id debe ser un numero'
    });
    
    const response = await pool.query('SELECT active FROM users WHERE id= $1', [idNum]);
    if(response.rowCount>0){
        const user= response.rows[0];
        if(user.active) res.json({
            mensaje: 'El usuario ya esta activo'
        });
        const responseUpdate = await pool.query('UPDATE users set active=true WHERE id= $1', [idNum]);
        res.json({
            mensaje: 'Activacion exitosa'
        });
    } 
    res.json({
        mensaje: 'No se encontro ningun usuario con la id '+idNum
    });      
}



const newUser = async (req, res) => {
    const { username, password } = req.body;
    if(username==null || username=="" ){
        res.json({
            mensaje: 'El campo username es obligatorio'
        });
        return;
    }

    if(password==null || password=="" ){
        res.json({
            mensaje: 'El campo password es obligatorio'
        });
        return;
    }
    

    const response = await pool.query('SELECT username FROM users WHERE username= $1', [username]);
    console.log(response.rowCount);
    if (response.rowCount > 0) {
        res.json({
            mensaje: 'El username ya existe'
        });
    } else {
        try {
            const resposeInsert = await pool.query('INSERT INTO public.users(username, password, active) VALUES ($1, $2 , false) RETURNING id', [username, password]);
            res.json({
                mensaje: 'creacion exitosa',
                user: {
                    id: resposeInsert.rows[0].id,
                    username: username
                }
            });
        } catch (error) {
            res.json({
                error: error.detail
            })
        }
    }
}

async function userValidate(username, password){
    const response = await pool.query('SELECT id FROM users WHERE username= $1 AND password= $2',[username, password])
    if(response.rowCount==1){
        return response.rows[0].id;
    }else{
        return null;
    }
}


module.exports =
{
    getUserById,
    deleteUserById,
    updateUserById,
    newUser,
    userValidate,
    activeById
}
