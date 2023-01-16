const db = require('../sequelize').db;
const { DataTypes } = require('sequelize');


const Authors = db.define("authors", {
    author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});


const Books = db.define("books", {
    book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
Authors.hasMany(Books, {
    foreignKey: {
        name: 'author_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});


const Readers = db.define("readers", {
    reader_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const Subscriptions = db.define("subscriptions", {
    subscription_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    issue_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    delay_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isAfterIssue(value) {
                if (value < this.issue_date) {
                    throw new Error("Issue_before_delay_validation not passed");
                }
            }
        }
    }
});
Readers.hasOne(Subscriptions, {
    foreignKey: {
        name: 'reader_id',
        allowNull: false,
        unique: true
    },
    onDelete: 'CASCADE'
});


const Borrowed = db.define('borrowed', {
    borrow_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    return_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isAfterBorrow(value) {
                console.log(`Borrow date: "${this.borrow_date}", return date: "${value}"`);
                if (value < this.borrow_date) {
                    throw new Error("Borrow_before_return_validation not passed");
                }
            }
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    reader_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
});
Books.hasOne(Borrowed, {
    foreignKey: {
        name: 'book_id',
        allowNull: false,
        unique: true
    },
    onDelete: 'CASCADE'
});
Readers.hasMany(Borrowed, {
    foreignKey: {
        name: 'reader_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
})


module.exports.Authors = Authors;
module.exports.Books = Books;
module.exports.Readers = Readers;
module.exports.Subscriptions = Subscriptions;
module.exports.Borrowed = Borrowed;