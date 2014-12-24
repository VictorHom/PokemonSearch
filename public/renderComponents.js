var parseArray = function(strArray){
	var str = "";
	for (var i = 0; i < strArray.length; i++){
		str = str + strArray[i];
	}
	return str;
}
var SearchBar = React.createClass({
	getInitialState: function(){
		return {searchString: ''};
	},
	handleChange: function(e){
		this.setState({searchString: e.target.value});
	},
	render: function(){
		var searchString = this.state.searchString.trim().toLowerCase();
		var pokemons = this.props.data;
		// var pokemonnode = this.props.data.map(function(pokemon, index){
		if (searchString.length > 0){
			pokemons = pokemons.filter(function(l){
				return l.name.toLowerCase().match( searchString );
			});
		}
		return (
			<div className = "search">
			<form className = "searchForm">
			Search:&nbsp;&nbsp;    
			<input type ="text" name ="searchTerm" placeholder = "search here" value = {this.state.searchString} onChange = {this.handleChange} />
			<input type="submit" value="Search" />
			</form>
			<div className="pkList">
      		<div className ="nameCategory">name</div>
			<div className = "numberCategory">no.</div>
			<div className = "typesCategory">type(s)</div>
			<div className = "abilitiesCategories">ability(s)</div>
        		{
					pokemons.map(function(pokemon, index){
						return <PokemonObject name={pokemon.name} id= {pokemon.id} types = {parseArray(pokemon.types)} abilities = {parseArray(pokemon.abilities)} key={index} ></PokemonObject>
					})
				}
      		</div>
			</div>
		);
	}
});

var PokemonList = React.createClass({
	render: function(){
		var pokemonnode = this.props.data.map(function(pokemon, index){
			return (
				<PokemonObject name={pokemon.name} id= {pokemon.id} 
				types = {pokemon.types} abilities = {pokemon.abilities} 
				key={index} >
				</PokemonObject>
			);
		});
		return (

      		<div className="pkList">
      		<div className ="nameCategory">name</div>
			<div className = "numberCategory">no.</div>
			<div className = "typesCategory">type(s)</div>
			<div className = "abilitiesCategories">ability(s)</div>
        		{pokemonnode}
      		</div>
		);
	}
});

var PokemonObject = React.createClass({

	render: function(){
		return (
			<div className = "pokemon">
			<div className ="pokemonName">
				{this.props.name}
			</div>
			<div className = "pkid">
				{this.props.id}
			</div>
			<div className = "types">{this.props.types}</div>
			<div className ="abilities">{this.props.abilities}</div>
			</div>
		);
	}
});

var PokemonBox = React.createClass({
	loadPokemonListFromServer: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data){
				this.setState({data: data});
			}.bind(this), 
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString())
			}.bind(this)
		});
	},
	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function(){
		this.loadPokemonListFromServer();
	},
	render: function(){
		return (
			<div className ="PokemonBox">
			<h1>Pokemon</h1>
			<SearchBar data={this.state.data} />
			</div>
		);
	}
});



React.render(
<PokemonBox  url = "test.json" />, document.getElementById('content')
	);