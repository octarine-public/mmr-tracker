// AUTO-GENERATED - do not edit.
declare class modifier_hoodwink_scurry_active extends Modifier implements IBuff {
	public readonly IsHidden = false
	public readonly BuffModifierName: string
	protected readonly DeclaredFunction: Map<EModifierfunction, () => [number, boolean]>
	public IsBuff(): this is IBuff
	protected GetAttackRangeBonus(): [number, boolean]
	protected GetMoveSpeedBonusPercentage(): [number, boolean]
	protected GetCastRangeBonusStacking(): [number, boolean]
	protected UpdateSpecialValues(): void
}
