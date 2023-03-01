import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp({
	data: {
		expenses: [],
		my:{},
		previous : null
	},

	methods: {
		/**
		 * Currency convert function stub.
		 * In a real app, you would use an API to get the latest exchange rates,
		 * and we'd need to support all currency codes, not just EUR, USD and GBP.
		 * However, for the purposes of this assignment, this is fine.
		 * @param {"EUR" | "USD" | "GBP"} from - Currency code to convert from
		 * @param {"EUR" | "USD" | "GBP"} to - Currency code to convert to
		 * @param {number} amount - Amount to convert
		 * @returns {number} Converted amount
		 */
		currencyConvert(from, to, amount) {
			const rates = {
				USD: 1,
				EUR: 0.99,
				GBP: 0.85
			};

			let tot = amount * rates[to] / rates[from]
			if(isNaN(tot)){
				return "";
			}
			else{
				return tot.toFixed(2);
			}
			
		},

		sort(){
			this.expenses.sort((a, b) => {
				if (!a.date && !b.date) return 0;
				if (!a.date) return 1;
				if (!b.date) return -1;
				return b.date.localeCompare(a.date);
				})
		}
		  ,
		additem() {
			if (!this.my.title) {
				alert("Please enter a title")
				return;
			}
			// if(currency == "dollars"){
			// 	{
			this.expenses.unshift(this.my);
			this.my = {};

			this.sort()
		  }
		
		  ,

		  
		deleteitem(index) {
			
			this.previous = {
				value: this.expenses.splice(index, 1)[0],
				index: index
			};
		}
		,
		undo() {
			if (this.previous) {
				this.expenses.splice(this.previous.index, 0, this.previous.value);
				this.previous = null;
			}
			this.sort()
		}

	},

	computed: {
		total_balance () {
			let total = 0;

			for (let expense of this.expenses) {
				let trinity_paid = expense.trinity_paid ?? 0;
				let neo_paid = expense.neo_paid ?? 0;
				let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
				let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

				total += (trinity_paid - neo_paid)/2 + trinity_paid_for_neo - neo_paid_for_trinity;
			}
			let tot_round = total.toFixed(2);


			return tot_round;
		}
	}
}, "#app");
