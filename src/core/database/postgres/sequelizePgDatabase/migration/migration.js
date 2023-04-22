module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.addColumn('users', 'newField', {
			type: Sequelize.DataTypes.STRING
		}),
	down: (queryInterface, Sequelize) =>
		queryInterface.removeColumn('users', 'newField')
};
