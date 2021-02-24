const connection = require('./connection');

class DB {
    constructor(connection){
        this.connection = connection;
    }

viewMainStat(){
    return this.connection.query(`SELECT * FROM mainstat ORDER BY id ASC`);
};
    
viewClass() {
    return this.connection.query(`SELECT * from class ORDER BY id ASC`);
};
    
viewadventurer() {
    return this.connection.query(`SELECT * from adventurer ORDER BY id ASC`);
};

addMainStat(mainstat) {
    return this.connection.query('INSERT INTO mainstat SET ?', {
          dept_name: mainstat
        });
};

addRole(Class) {
    return this.connection.query(`INSERT INTO class SET ?`, Class);
};

addAdventuerer(adventurer) {
    return this.connection.query(`INSERT INTO adventurer SET ?`, adventurer);
};
    
updateEmpClass(newEmpRoll) {
    console.log(newEmpRoll);
    return this.connection.query(
        `UPDATE adventurer SET role_id = ${newEmpRoll.newRole} WHERE id = ${newEmpRoll.empId}`, newEmpRoll
    );
}


}

module.exports = new DB(connection);