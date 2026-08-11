// AUTO-GENERATED - do not edit.
declare class modifier_oracle_false_promise extends Modifier implements IBuff {
	public readonly BuffModifierName: string
	protected readonly DeclaredFunction: Map<EModifierfunction, () => [number, boolean]>
	public IsBuff(): this is IBuff
	protected GetSpellAmplifyPercentage(): [number, boolean]
	protected GetPhysicalArmorBonus(): [number, boolean]
	protected GetBaseAttackTimeConstantAdjust(): [number, boolean]
	protected UpdateSpecialValues(): void
	protected GetSpecialValue(specialName: string, abilityName?: string, level?: number): number
}
